import bcrypt from 'bcrypt'

// export const checkIfPasswordExists = (
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   previousPasswords: any,
//   newPassword: string,
// ) => {
//   return previousPasswords.some(async (hashedPassword: string) => {
//     return await bcrypt.compare(newPassword, hashedPassword)
//   })
// }

export async function checkPassword(
  plainTextPassword: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  hashedPassword: any,
): Promise<boolean> {
  return hashedPassword.some(async (hashed: string) => {
    await bcrypt.compare(plainTextPassword, hashed)
  })
}
