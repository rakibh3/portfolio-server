import { Schema, model } from 'mongoose'
import { TCategory } from './category.interface'

const categorySchema = new Schema<TCategory>(
  {
    createdBy: { type: String, required: true, ref: 'User' },
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true, versionKey: false },
)

export const Category = model<TCategory>('Category', categorySchema)
