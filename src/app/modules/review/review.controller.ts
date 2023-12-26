import { sendResponse } from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { ReviewService } from './review.service'
import { catchAsync } from '../../utils/catchAsync'

// Create a review for a course
const createReview = catchAsync(async (req, res) => {
  const { ...review } = req.body

  const result = await ReviewService.createReviewIntoDatabase(review)

  sendResponse(res, {
    success: true,
    message: 'Review created successfully',
    statusCode: httpStatus.CREATED,
    data: result,
  })
})

// Get all reviews for a course
const getAllReviews = catchAsync(async (req, res) => {
  const courseId = req.params.coursesId
  const result =
    await ReviewService.getAllReviewsWithCoursesFromDatabase(courseId)

  sendResponse(res, {
    success: true,
    message: 'Course and Reviews retrieved successfully',
    statusCode: httpStatus.OK,
    data: result,
  })
})

// Export controllers
export const ReviewController = {
  createReview,
  getAllReviews,
}
