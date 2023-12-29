import express from 'express'
import auth from '../../middlewares/auth'
import { USER_ROLE } from './../user/user.constant'
import { validateRequest } from '../../middlewares/validateRequest'
import {
  changePasswordValidationSchema,
  loginValidationSchema,
  refreshTokenValidationSchema,
} from './auth.validation'
import { AuthControllers } from './auth.controller'

const router = express.Router()

router.post(
  '/login',
  validateRequest(loginValidationSchema),
  AuthControllers.loginUser,
)

router.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(changePasswordValidationSchema),
  AuthControllers.changePassword,
)

router.post(
  '/refresh-token',
  validateRequest(refreshTokenValidationSchema),
  AuthControllers.refreshToken,
)

export const AuthRoutes = router
