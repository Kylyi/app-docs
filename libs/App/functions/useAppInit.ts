// Types
import type { IAuthJwt } from '~/libs/Auth/server/types/auth-jwt.type'

export function useAppInit() {
  // Utils
  const { handleRequest } = useRequest()
  const userState = useCurrentUserState()

  async function init(account?: IAuthJwt) {
    //
  }

  return {
    init,
  }
}
