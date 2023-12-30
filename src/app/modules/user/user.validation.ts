import { z } from 'zod'

export const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be string',
    })
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(20, { message: 'Password can not be more than 20 characters' })
    .optional(),
})
