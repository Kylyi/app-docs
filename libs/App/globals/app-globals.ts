/* eslint-disable antfu/top-level-function */

// Types
import type { IAuthJwt } from '~/libs/Auth/server/types/auth-jwt.type'

// App
export const useInstanceIdState = () => useCookie<number | undefined>('instanceId')

export const useLastAccessedPageState = () =>
  useState<string | null>('lastAccessedPage', () => null)

// Auth
export const useCurrentUserState = () =>
  useState<IAuthJwt | null>('user', () => null)
