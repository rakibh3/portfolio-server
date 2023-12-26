import { Course } from '../course/course.model'
import { TReview } from './review.interface'
import { Review } from './review.model'

const createReviewIntoDatabase = async (review: TReview) => {
  const result = await Review.create(review)
  return result
}

const getAllReviewsWithCoursesFromDatabase = async (courseId: string) => {
  const course = await Course.findById(courseId, { __v: 0 })
  const reviews = await Review.find({ courseId }, { _id: 0, __v: 0 })

  return {
    course,
    reviews,
  }
}

export const ReviewService = {
  createReviewIntoDatabase,
  getAllReviewsWithCoursesFromDatabase,
}
