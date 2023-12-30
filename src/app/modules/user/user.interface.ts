/* eslint-disable no-unused-vars */
import { Model } from 'mongoose'
import { USER_ROLE } from './user.constant'

export type TUser = {
  _id?: string
  username: string
  email: string
  password: string
  passwordHistory?: string[]
  // passwordChangedAt?: Date
  role: 'user' | 'admin'
}

export interface UserModel extends Model<TUser> {
  // Check if the user exists
  isUserExists(username: string): Promise<TUser>

  // Compare the plain text password with the hashed password
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>

  // Check if the JWT was issued before the password was changed
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean
}

export type TUserRole = keyof typeof USER_ROLE
