// Zod validation for category
import { z } from 'zod'

export const categoryCreateValidationSchema = z.object({
  name: z.string(),
})
