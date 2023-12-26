import express from 'express'
import { CategoryController } from './category.controller'
import { validateRequest } from '../../middlewares/validateRequest'
import { categoryCreateValidationSchema } from './category.validation'

const router = express.Router()

// Router for creating a new category
router.post(
  '/categories',
  validateRequest(categoryCreateValidationSchema),
  CategoryController.createCategory,
)
router.get('/categories', CategoryController.getAllCategory)

export const CategoryRouter = router
