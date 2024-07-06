import { TExperience } from './experience.interface'
import { Experience } from './experience.model'

// Cretaes a new experience into the database
const createExperienceIntoDatabase = async (payLoad: TExperience) => {
  const result = await Experience.create(payLoad)
  return result
}

// Get all experiences from the database
const getAllExperiencesFromDatabase = async () => {
  const result = await Experience.find()
  return result
}

// Update an experience from the database
const updateExperienceFromDatabase = async (
  id: string,
  payLoad: TExperience,
) => {
  const result = await Experience.findByIdAndUpdate(id, payLoad, { new: true })
  return result
}

// Delete an experience from the database
const deleteExperienceFromDatabase = async (id: string) => {
  const result = await Experience.findByIdAndDelete(id)
  return result
}

// Exports all services
export const ExperienceServices = {
  createExperienceIntoDatabase,
  getAllExperiencesFromDatabase,
  updateExperienceFromDatabase,
  deleteExperienceFromDatabase,
}
