import { enhance } from '@zenstackhq/runtime'
import jwt from 'jsonwebtoken'
import type { IAuthJwt } from '~/libs/Auth/server/types/auth-jwt.type'
import { prisma } from '~/server/prisma'

export default defineEventHandler(ev => {
  const path = ev.path

  const cookies = parseCookies(ev)
  const secret = import.meta.env.JWT_SECRET

  // if (path.startsWith('/_ipx')) {
  //   console.log('Requesting IPX image:', path)
  // }

  // When calling the API, provide the Prisma client with the user context
  if (path.startsWith('/api')) {
    try {
      jwt.verify(cookies._accessToken, secret)
      const user = jwt.decode(
        cookies._accessToken,
        secret,
      ) as unknown as IAuthJwt

      ev.context = {
        ...ev.context,
        auth: user,
        prisma: enhance(prisma, { user: user ?? undefined }),
      }
    } catch (error) {
      ev.context = {
        ...ev.context,
        prisma: enhance(prisma),
      }
    }
  }
})
