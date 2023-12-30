import express from 'express'
import { CategoryController } from './category.controller'
import { validateRequest } from '../../middlewares/validateRequest'
import { categoryCreateValidationSchema } from './category.validation'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../user/user.constant'

const router = express.Router()

// Router for creating a new category
router.post(
  '/categories',
  auth(USER_ROLE.admin),
  validateRequest(categoryCreateValidationSchema),
  CategoryController.createCategory,
)
router.get('/categories', CategoryController.getAllCategory)

export const CategoryRouter = router
