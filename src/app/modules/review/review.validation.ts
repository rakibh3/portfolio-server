import mongoose from 'mongoose'
import * as z from 'zod'

// Define Zod schema for review
export const reviewValidationSchema = z.object({
  courseId: z.string().refine((val) => {
    return mongoose.Types.ObjectId.isValid(val)
  }),
  review: z.string(),
  rating: z
    .number()
    .int()
    .refine((value) => value >= 1 && value <= 5, {
      message: 'Rating must be an integer between 1 and 5',
    }),
})
