import { z } from 'zod'

export const loginValidationSchema = z.object({
  username: z.string({ required_error: 'Username is required.' }),
  password: z.string({ required_error: 'Password is required' }),
})

export const changePasswordValidationSchema = z.object({
  currentPassword: z.string({
    required_error: 'Current password is required!',
  }),
  newPassword: z.string({ required_error: 'Password is required' }),
})

// export const refreshTokenValidationSchema = z.object({
//   refreshToken: z.string({
//     required_error: 'Refresh token is required!',
//   }),
// })
