import express from 'express'
import { ReviewController } from './review.controller'
import { validateRequest } from '../../middlewares/validateRequest'
import { reviewValidationSchema } from './review.validation'

const router = express.Router()

// Router for reviews
router.post(
  '/reviews',
  validateRequest(reviewValidationSchema),
  ReviewController.createReview,
)
router.get('/courses/:coursesId/reviews', ReviewController.getAllReviews)

export const ReviewRoute = router
