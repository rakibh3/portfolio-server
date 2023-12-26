/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema, model } from 'mongoose'
import { TCourse, TDetails, TTag } from './course.interface'

const TagSchema = new Schema<TTag>(
  {
    name: { type: String, required: true },
    isDeleted: { type: Boolean, required: true },
  },
  { _id: false },
)

const DetailsSchema = new Schema<TDetails>(
  {
    level: { type: String, required: true },
    description: { type: String, required: true },
  },
  { _id: false },
)

// Creating Mongoose schema
const courseSchema = new Schema<TCourse>({
  title: { type: String, required: true, unique: true },
  instructor: { type: String, required: true },
  categoryId: { type: String, required: true, ref: 'Category' },
  price: { type: Number, required: true },
  tags: { type: [TagSchema], required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  language: { type: String, required: true },
  provider: { type: String, required: true },
  durationInWeeks: { type: Number, required: true },
  details: { type: DetailsSchema, required: true },
})

// Pre-save middleware to convert specified string fields to lowercase
courseSchema.pre('save', async function (this: TCourse, next) {
  const fieldsToLowercase = ['title', 'language', 'provider'] as const

  fieldsToLowercase.forEach((field) => {
    if (this[field]) {
      this[field] = this[field].toLowerCase() as (typeof this)[typeof field]
    }
  })

  if (this.details && this.details.level) {
    this.details.level = this.details.level.toLowerCase() as string
  }

  if (this.tags && this.tags.length > 0) {
    this.tags = this.tags.map((tag: TTag) => {
      return {
        name: tag.name.toLowerCase() as string,
        isDeleted: tag.isDeleted,
      }
    })
  }

  next()
})

export const Course = model<TCourse>('Course', courseSchema)
