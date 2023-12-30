import express from 'express'
import { CourseController } from './course.controller'
import { validateRequest } from '../../middlewares/validateRequest'
import {
  courseCreateValidationSchema,
  courseUpdateValidationSchema,
} from './course.validation'
import { USER_ROLE } from '../user/user.constant'
import auth from '../../middlewares/auth'

const router = express.Router()

router.post(
  '/course',
  auth(USER_ROLE.admin),
  validateRequest(courseCreateValidationSchema),
  CourseController.createCourse,
)
router.get('/courses', CourseController.getAllCourse)
router.get('/course/best', CourseController.getBestCourses)
router.put(
  '/courses/:courseId',
  auth(USER_ROLE.admin),
  validateRequest(courseUpdateValidationSchema),
  CourseController.updateCourse,
)

export const CourseRoute = router
