import * as z from 'zod'

// Define Zod schemas
const tagvalidationSchema = z.object({
  name: z.string(),
  isDeleted: z.boolean(),
})

const detailsValidationSchema = z.object({
  level: z.string(),
  description: z.string(),
})

export const courseCreateValidationSchema = z.object({
  title: z.string(),
  instructor: z.string(),
  categoryId: z.string(),
  price: z.number().min(0),
  tags: z.array(tagvalidationSchema),
  startDate: z.string(),
  endDate: z.string(),
  language: z.string(),
  provider: z.string(),
  durationInWeeks: z.number().optional(),
  details: detailsValidationSchema,
})

export const courseUpdateValidationSchema = z.object({
  title: z.string().optional(),
  instructor: z.string().optional(),
  categoryId: z.string().optional(),
  price: z.number().min(0).optional(),
  tags: z.array(tagvalidationSchema).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  language: z.string().optional(),
  provider: z.string().optional(),
  durationInWeeks: z.number().optional(),
  details: detailsValidationSchema.optional(),
})
