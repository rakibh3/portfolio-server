/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt'
import { Schema, model } from 'mongoose'
import { TUser, UserModel } from './user.interface'
import config from '../../config'
const userSchema = new Schema<TUser, UserModel>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    passwordHistory: {
      type: [String],
      default: [],
      select: false,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

// Convert the password to a hash before saving it to the database
userSchema.pre('save', async function (next) {
  const user = this
  const saltRounds = Number(config.bcrypt_salt_rounds)
  user.password = await bcrypt.hash(user.password, saltRounds)
  // user.passwordHistory?.push(user.password)
  next()
})

userSchema.post('save', function (doc, next) {
  doc.password = ''
  next()
})

// Check if the user exists
userSchema.statics.isUserExists = async function (username: string) {
  return await User.findOne({ username }).select('+password')
}

// Check if password is matched with the hash stored in the database
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword)
}

// userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
//   passwordChangedTimestamp: Date,
//   jwtIssuedTimestamp: number,
// ) {
//   const passwordChangedTime =
//     new Date(passwordChangedTimestamp).getTime() / 1000
//   return passwordChangedTime > jwtIssuedTimestamp
// }

export const User = model<TUser, UserModel>('User', userSchema)
