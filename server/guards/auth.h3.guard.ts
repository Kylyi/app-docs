import jwt from 'jsonwebtoken'
import type { H3Event } from 'h3'

// Types
import type { IAuthJwt } from '~/libs/Auth/server/types/auth-jwt.type'

// Functions
import { setAuthCookies } from '~/libs/Auth/server/functions/create-user-token-payload'
import { prisma } from '~/server/prisma'

export async function H3Auth(event: H3Event) {
  const t = await useTranslation(event)
  const cookies = parseCookies(event)
  const secret = import.meta.env.JWT_SECRET

  // When access token is valid, we just let the user call the endpoint
  try {
    jwt.verify(cookies._accessToken, secret)
    const user = jwt.decode(cookies._accessToken, secret) as unknown as IAuthJwt

    event.context.auth = user
  } catch (error) {}

  // Handle refresh token
  try {
    jwt.verify(cookies._refreshToken, secret)

    const { id } = jwt.decode(cookies._refreshToken) as jwt.JwtPayload
    const { user } = await setAuthCookies(id, {
      ctx: { prisma, ev: event },
      omitRefreshToken: true,
    })

    event.context.auth = user
  } catch (error) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: t('auth.error.unauthorized'),
      cause: error,
    })
  }
}
