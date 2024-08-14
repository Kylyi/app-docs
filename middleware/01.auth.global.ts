export default defineNuxtRouteMiddleware(async to => {
  // const nuxtApp = useNuxtApp()

  // const toMeta = Array.isArray(to.meta.middleware)
  //   ? to.meta.middleware
  //   : [to.meta.middleware]
  // const isPublic = toMeta.includes('public')

  // if (isPublic) {
  //   return
  // }

  // try {
  //   const currentUserState = useCurrentUserState()

  //   // If no user is logged in, try to refresh the tokens
  //   if (!currentUserState.value) {
  //     const user = await $api().auth.refreshToken.mutate()
  //     useCurrentUserState().value = user
  //   }
  // } catch (error) {
  //   return navigateTo({
  //     path: nuxtApp.$localePath('/auth/sign-in'),
  //     query: { redirect: to.fullPath },
  //   })
  // }
})
