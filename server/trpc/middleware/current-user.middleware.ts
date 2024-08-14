import jwt from 'jsonwebtoken'
import { enhance } from '@zenstackhq/runtime'

// Types
import type { IAuthJwt } from '~/libs/Auth/server/types/auth-jwt.type'

/**
 * This is used only for the public procedure
 */
export function currentUserMiddleware() {
  return middleware(async opts => {
    const { ctx } = opts

    const cookies = parseCookies(ctx.ev)
    const secret = import.meta.env.JWT_SECRET

    const user = jwt.decode(
      cookies._accessToken,
      secret,
    ) as unknown as IAuthJwt | null

    return opts.next({
      ctx: {
        ...ctx,
        user,
        prisma: enhance(ctx.prisma, { user: user ?? undefined }),
      },
    })
  })
}
