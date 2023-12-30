/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import httpStatus from 'http-status'
import AppError from '../../error/AppError'
import { User } from '../user/user.model'
import { TLoginUser } from './auth.interface'
import config from '../../config'

// Login user
const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExists(payload.username)
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!')
  }

  const isPasswordCorrect = await User.isPasswordMatched(
    payload?.password,
    user?.password,
  )

  if (!isPasswordCorrect) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password is incorrect!')
  }

  // Create a token that will be sent to the client
  const jwtPayload = {
    _id: user?._id,
    username: user?.username,
    role: user?.role,
    email: user?.email,
  }

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires_in as string,
  })

  const userWithoutPassword = {
    _id: user?._id,
    username: user?.username,
    email: user?.email,
    role: user?.role,
  }

  return {
    user: userWithoutPassword,
    accessToken,
  }
}

// Change password
const changePassword = async (
  userData: JwtPayload,
  payload: { currentPassword: string; newPassword: string },
) => {
  // Fetch user information
  const user = await User.isUserExists(userData.username)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!')
  }

  // Validate current password
  const isPasswordMatch = await User.isPasswordMatched(
    payload?.currentPassword,
    user?.password,
  )
  if (!isPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, 'Current Password is incorrect!')
  }

  // Check against password history
  const passwordHistory = user.passwordHistory || []
  const previousPasswords = passwordHistory?.slice(-2)

  async function checkIfPassExists(
    plainTextPassword: any,
    previousPasswords: any,
  ) {
    for (let i = 0; i < previousPasswords.length; i++) {
      const isPasswordMatch = await bcrypt.compare(
        plainTextPassword,
        previousPasswords[i],
      )
      if (isPasswordMatch) {
        return true
      }
    }
  }

  const isPasswordReused = await checkIfPassExists(
    payload.newPassword,
    previousPasswords,
  )

  if (isPasswordReused) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'New Password is similar to the previous one!',
    )
  }

  // Hash the new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  )

  // Update password history
  passwordHistory.unshift(newHashedPassword)

  // Update password and history
  const updatedPassword = await User.findOneAndUpdate(
    {
      _id: userData._id,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      passwordHistory: [...previousPasswords, newHashedPassword],
      passwordChangedAt: new Date(),
    },
    { new: true },
  )

  return updatedPassword
}

export const AuthServices = {
  loginUser,
  changePassword,
}
