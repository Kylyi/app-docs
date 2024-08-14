import type { Prisma } from '@prisma/client'
import jwt from 'jsonwebtoken'
import { pick } from 'lodash-es'
import { prisma } from '~/server/prisma'

// Types
import type { IAuthJwt } from '~/libs/Auth/server/types/auth-jwt.type'

// Models
import { LogOperationEnum } from '~/libs/Log/enums/log-operation.enum'

export function createUserTokenPayload(
  user: Prisma.UserGetPayload<{
    select: {
      id: true
      firstName: true
      lastName: true
    }
  }>,
): IAuthJwt {
  return {
    ...pick(user, ['id', 'firstName', 'lastName']),
  }
}

// FIXME: The`ctx` type is not correct
export async function setAuthCookies(
  id: number,
  opts: {
    ctx: any
    omitRefreshToken?: boolean
  },
) {
  const { ctx, omitRefreshToken } = opts
  const t = await useTranslation(ctx.ev)

  const user = await prisma.user.findFirst({
    where: { id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  })

  if (!user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: t('auth.error.invalidCredentials'),
    })
  }

  const transformedUser = createUserTokenPayload(user)

  // Access token
  const accessToken = jwt.sign(transformedUser, import.meta.env.JWT_SECRET, {
    expiresIn: '15m',
  })

  setCookie(ctx.ev, '_accessToken', accessToken, {
    httpOnly: true,
    domain: import.meta.env.VITE_COOKIE_DOMAIN,
  })

  // Refresh token
  let refreshToken: string | undefined

  if (!omitRefreshToken) {
    refreshToken = jwt.sign({ id: user.id }, import.meta.env.JWT_SECRET, {
      expiresIn: '1000y',
    })

    setCookie(ctx.ev, '_refreshToken', refreshToken, {
      httpOnly: true,
      domain: import.meta.env.VITE_COOKIE_DOMAIN,
    })
  }

  return {
    accessToken,
    refreshToken,
    user: transformedUser,
  }
}
