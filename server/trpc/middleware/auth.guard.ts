import jwt from 'jsonwebtoken'

// Types
import type { IAuthJwt } from '~/libs/Auth/server/types/auth-jwt.type'

// Functions
import { setAuthCookies } from '~/libs/Auth/server/functions/create-user-token-payload'

export function authMiddleware() {
  return middleware(async opts => {
    const { ctx } = opts

    const t = await useTranslation(ctx.ev)
    const cookies = parseCookies(ctx.ev)
    const secret = import.meta.env.JWT_SECRET

    // When access token is valid, we just let the user call the endpoint
    try {
      jwt.verify(cookies._accessToken, secret)
      const user = jwt.decode(
        cookies._accessToken,
        secret,
      ) as unknown as IAuthJwt

      return opts.next({
        ctx: {
          ...ctx,
          user,
          prisma: ctx.ev.context.prisma,
        },
      })
    } catch (error) {}

    // Handle refresh token
    try {
      jwt.verify(cookies._refreshToken, secret)

      const { id } = jwt.decode(cookies._refreshToken) as jwt.JwtPayload
      const { user } = await setAuthCookies(id, { ctx, omitRefreshToken: true })

      return opts.next({
        ctx: { ...ctx, user, prisma: ctx.ev.context.prisma },
      })
    } catch (error) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: t('auth.error.unauthorized'),
        cause: error,
      })
    }
  })
}
