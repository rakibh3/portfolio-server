import { Types } from 'mongoose'

export type TReview = {
  courseId: Types.ObjectId
  review: string
  rating: number
}
