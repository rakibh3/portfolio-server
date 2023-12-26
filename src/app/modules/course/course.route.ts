import express from 'express'
import { CourseController } from './course.controller'
import { validateRequest } from '../../middlewares/validateRequest'
import {
  courseCreateValidationSchema,
  courseUpdateValidationSchema,
} from './course.validation'

const router = express.Router()

router.post(
  '/course',
  validateRequest(courseCreateValidationSchema),
  CourseController.createCourse,
)
router.get('/courses', CourseController.getAllCourse)
router.get('/course/best', CourseController.getBestCourses)
router.put(
  '/courses/:courseId',
  validateRequest(courseUpdateValidationSchema),
  CourseController.updateCourse,
)

export const CourseRoute = router
