import { randomBytes, randomUUID, scryptSync } from 'node:crypto'

// Pass the password string and get hashed password back
// ( and store only the hashed string in your database)
function encryptPassword(password: string, salt: string) {
  return scryptSync(password, salt, 32).toString('hex')
}

/**
 * Hash password with random salt
 * @return {string} password hash followed by salt
 *  XXXX till 64 XXXX till 32
 *
 */
export function hashPassword(password: string): string {
  // Any random string here (ideally should be atleast 16 bytes)
  const salt = randomBytes(16).toString('hex')

  return encryptPassword(password, salt) + salt
}

// fetch the user from your db and then use this function

/**
 * Match password against the stored hash
 */
export function matchPassword(password: string, hash: string): boolean {
  // extract salt from the hashed string
  // our hex password length is 32*2 = 64
  const salt = hash.slice(64)
  const originalPassHash = hash.slice(0, 64)
  const currentPassHash = encryptPassword(password, salt)

  return originalPassHash === currentPassHash
}

/**
 * Generates random UUID
 */
export function generateRandomUUID() {
  return randomUUID()
}

/**
 * Generates random INT UUID
 */
export function generateRandomIntUUID() {
  const buf = randomBytes(4)
  const int = Math.abs(buf.readInt32BE(0)) // read a 32-bit signed integer from the buffer

  return int
}
