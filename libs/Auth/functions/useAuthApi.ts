// Types
import type { RouterInput } from '~/utils/router/types/router.type'

export function useAuthApi() {
  const { $client } = useNuxtApp()

  // Sign in
  async function signIn(payload: RouterInput['auth']['signIn']) {
    return $client.auth.signIn.mutate(payload)
  }

  // Logout
  async function logout() {
    return $client.auth.logout.mutate()
  }

  return {
    signIn,
    logout,
  }
}
