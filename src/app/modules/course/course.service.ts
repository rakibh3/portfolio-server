/* eslint-disable @typescript-eslint/no-explicit-any */
import { filterByUtils } from '../../utils/filter'
import { sortByUtils, sortOrderUtils } from '../../utils/sort'
import { ITag, updateTags } from '../../utils/tags'
import { TCourse } from './course.interface'
import { Course } from './course.model'

// Creates a new course
const createCourseIntoDatabase = async (payLoad: TCourse) => {
  const result = await Course.create(payLoad)
  return result
}

// Gets all courses from the database
const getAllCourseFromDatabase = async (query: Record<string, any>) => {
  const page = parseInt(query.page as string) || 1
  const limit = parseInt(query.limit as string) || 10

  const sortBy = sortByUtils(query.sortBy as string)
  const sortOrder = sortOrderUtils(query.sortOrder as string)

  const filterBy = filterByUtils(query)

  const courses = await Course.find(filterBy)
    .sort({ [sortBy]: sortOrder })
    .skip((page - 1) * limit)
    .limit(limit)

  const totalFilteredCourses = await Course.countDocuments(filterBy)

  const metaData = {
    page,
    limit,
    total: totalFilteredCourses,
  }

  return {
    courses,
    metaData,
  }
}

// Gets the best courses from the database
const getBestCoursesFromDatabase = async () => {
  const courses = await Course.aggregate([
    {
      $lookup: {
        from: 'reviews',
        localField: '_id',
        foreignField: 'courseId',
        as: 'reviews',
      },
    },
    {
      $addFields: {
        reviewCount: { $size: '$reviews' },
        averageRating: { $avg: '$reviews.rating' },
      },
    },

    { $sort: { averageRating: -1 } },
    { $limit: 1 },
    {
      $project: {
        __v: 0,
        reviews: 0,
      },
    },
  ])
  return courses
}

// Updates a course into the database
const updateCourseIntoDatabase = async (
  courseId: string,
  payLoad: Partial<TCourse>,
) => {
  const { tags, details, ...remainingCourseData } = payLoad

  const modifiedData: Record<string, unknown> = {
    ...remainingCourseData,
  }

  // Tags are update dynamically
  if (tags) {
    const course = await Course.findById(courseId)
    const courseTag: ITag[] = course?.tags || []

    const updatedTags = updateTags(courseTag, { tags })
    modifiedData.tags = updatedTags
  }

  // Details update dynamically
  if (details && Object.keys(details).length) {
    for (const [key, value] of Object.entries(details)) {
      modifiedData[`details.${key}`] = value
    }
  }

  const result = await Course.findByIdAndUpdate(courseId, modifiedData, {
    new: true,
  })

  return result
}

// Exports the course services
export const CourseServices = {
  createCourseIntoDatabase,
  getAllCourseFromDatabase,
  getBestCoursesFromDatabase,
  updateCourseIntoDatabase,
}
