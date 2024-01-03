import bcrypt from 'bcrypt'

export async function checkPassword(
  plainTextPassword: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  hashedPassword: any,
): Promise<boolean> {
  return hashedPassword.some(async (hashed: string) => {
    await bcrypt.compare(plainTextPassword, hashed)
  })
}
