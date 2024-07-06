// Zod validation for Experience module
import { z } from 'zod'

export const experienceCreateValidationSchema = z.object({
  jobTitle: z.string(),
  companyName: z.string(),
  position: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  description: z.string(),
})

export const experienceUpdateValidationSchema = z.object({
  jobTitle: z.string().optional(),
  companyName: z.string().optional(),
  position: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  description: z.string().optional(),
})
