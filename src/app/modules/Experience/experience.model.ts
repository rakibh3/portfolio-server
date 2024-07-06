import { Schema, model } from 'mongoose'
import { TExperience } from './experience.interface'

const experienceSchema = new Schema<TExperience>(
  {
    jobTitle: { type: String, required: true },
    companyName: { type: String, required: true },
    position: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
)

export const Experience = model<TExperience>('Experience', experienceSchema)
