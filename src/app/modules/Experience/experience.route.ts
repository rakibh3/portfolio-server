import express from 'express'
import { ExperienceController } from './experience.controller'

// import { validateRequest } from '../../middlewares/validateRequest'
// import auth from '../../middlewares/auth'
// import { USER_ROLE } from '../user/user.constant'

const router = express.Router()

// Router for adding new experience
router.post(
  '/experience',
  // auth(USER_ROLE.admin),
  // validateRequest(categoryCreateValidationSchema),
  // CategoryController.createCategory,
  ExperienceController.createExperience,
)
router.get(
  '/experiences',
  // auth(USER_ROLE.admin),
  ExperienceController.getAllExperiences,
)

export const ExperienceRoute = router
