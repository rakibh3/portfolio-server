import { Schema, model } from 'mongoose'
import { TReview } from './review.interface'

// Review schema model
const reviewSchema = new Schema<TReview>({
  courseId: { type: Schema.Types.ObjectId, required: true, ref: 'Course' },
  review: { type: String, required: true },
  rating: { type: Number, required: true },
})

export const Review = model<TReview>('Review', reviewSchema)
