import type { User } from '@prisma/client'

export type IAuthJwt = Pick<User, 'id' | 'firstName' | 'lastName'>
