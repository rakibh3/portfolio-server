import { TCategory } from './category.interface'
import { Category } from './category.model'

// Create new category into the database
const createCategoryIntoDatabase = async (payLoad: TCategory) => {
  const result = await Category.create(payLoad)
  return result
}

// Get all categories from the database
const getAllCategoryFromDatabase = async () => {
  const result = await Category.find().populate('createdBy', {
    createdAt: 0,
    updatedAt: 0,
    __v: 0,
  })
  return result
}

// Exports all services
export const CategoryServices = {
  createCategoryIntoDatabase,
  getAllCategoryFromDatabase,
}
