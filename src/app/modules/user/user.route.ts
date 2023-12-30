import express from 'express'
import { userValidationSchema } from './user.validation'
import { validateRequest } from '../../middlewares/validateRequest'
import { UserControllers } from './user.controller'
// import auth from '../../middlewares/auth'
// import { USER_ROLE } from './user.constant'

const router = express.Router()

// router.post(
//   '/create-student',
//   auth(USER_ROLE.admin),
//   validateRequest(createStudentValidationSchema),
//   UserControllers.createStudent,
// );

// router.post(
//   '/create-faculty',
//   auth(USER_ROLE.admin),
//   validateRequest(createFacultyValidationSchema),
//   UserControllers.createFaculty,
// );

router.post(
  '/auth/register',
  // auth(USER_ROLE.admin),
  validateRequest(userValidationSchema),
  UserControllers.createUser,
)

export const UserRoute = router
