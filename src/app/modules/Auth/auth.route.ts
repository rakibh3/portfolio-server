import express from 'express'
import {
  changePasswordValidationSchema,
  loginValidationSchema,
  // refreshTokenValidationSchema,
} from './auth.validation'

import { USER_ROLE } from '../user/user.constant'
import { validateRequest } from '../../middlewares/validateRequest'
import auth from '../../middlewares/auth'
import { AuthControllers } from './auth.controller'

const router = express.Router()

router.post(
  '/auth/login',
  validateRequest(loginValidationSchema),
  AuthControllers.loginUser,
)

router.post(
  '/auth/change-password',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(changePasswordValidationSchema),
  AuthControllers.changePassword,
)

// router.post(
//   '/refresh-token',
//   validateRequest(refreshTokenValidationSchema),
//   AuthControllers.refreshToken,
// )

export const AuthRoute = router
