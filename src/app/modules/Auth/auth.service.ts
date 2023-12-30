/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import httpStatus from 'http-status'
import AppError from '../../error/AppError'
import { User } from '../user/user.model'
import { TLoginUser } from './auth.interface'
import config from '../../config'
// import { checkPassword } from '../../middlewares/checkExistsPass'

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
  // {
  //   "_id": "54321abcde67890fghij", // User's _id
  //   "role": "user",               // User's role
  //   "email": "john@example.com",  // User's email
  //   "iat": 1626619535,            // Issued At (timestamp)
  //   "exp": 1626623535             // Expiration (timestamp)
  // }

  const jwtPayload = {
    _id: user?._id,
    username: user.username,
    role: user.role,
    email: user.email,
  }

  // const accessToken = createToken(
  //   jwtPayload,
  //   config.jwt_access_secret as string,
  //   config.jwt_access_expires_in as string,
  // )

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  })

  // const refreshToken = createToken(
  //   jwtPayload,
  //   config.jwt_refresh_secret as string,
  //   config.jwt_refresh_expires_in as string,
  // )

  const userWithoutPassword = {
    _id: user?._id,
    username: user?.username,
    email: user?.email,
    role: user?.role,
  }

  return {
    user: userWithoutPassword,
    accessToken,
    // refreshToken,
    // needsPasswordChange: user?.needsPasswordChange,
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

// const refreshToken = async (token: string) => {
//   // checking if the given token is valid
//   const decoded = jwt.verify(
//     token,
//     config.jwt_refresh_secret as string,
//   ) as JwtPayload

//   const { userId, iat } = decoded

//   // checking if the user is exist
//   const user = await User.isUserExistsByCustomId(userId)

//   if (!user) {
//     throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
//   }
//   // checking if the user is already deleted
//   const isDeleted = user?.isDeleted

//   if (isDeleted) {
//     throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !')
//   }

//   // checking if the user is blocked
//   const userStatus = user?.status

//   if (userStatus === 'blocked') {
//     throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !')
//   }

//   if (
//     user.passwordChangedAt &&
//     User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
//   ) {
//     throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !')
//   }

//   const jwtPayload = {
//     userId: user.id,
//     role: user.role,
//   }

//   const accessToken = createToken(
//     jwtPayload,
//     config.jwt_access_secret as string,
//     config.jwt_access_expires_in as string,
//   )

//   return {
//     accessToken,
//   }
// }

export const AuthServices = {
  loginUser,
  changePassword,
  // refreshToken,
}
