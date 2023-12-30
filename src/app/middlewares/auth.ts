import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import jwt, { JwtPayload } from 'jsonwebtoken'
import AppError from '../error/AppError'
import { catchAsync } from '../utils/catchAsync'
import config from '../config'
import { User } from '../modules/user/user.model'
import { TUserRole } from '../modules/user/user.interface'

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization

    // Check if the token is provided
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'No token provided !')
    }

    //  Check if the token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload

    const { username, role, iat } = decoded

    // checking if the user is exist
    const user = await User.isUserExists(username)

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found!')
    }

    if (
      user.passwordChangedAt &&
      User.isJWTIssuedBeforePasswordChanged(
        user.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Password has been changed!')
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Not authorized!')
    }

    req.user = decoded as JwtPayload
    next()
  })
}

export default auth
