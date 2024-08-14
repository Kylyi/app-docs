export default defineNuxtRouteMiddleware(to => {
  const nuxtApp = useNuxtApp()

  const currentUserState = useCurrentUserState()
  const toMeta = Array.isArray(to.meta.middleware)
    ? to.meta.middleware
    : [to.meta.middleware]

  if (currentUserState.value) {
    return navigateTo({
      path: nuxtApp.$localePath('/'),
      query: { redirect: to.fullPath },
    })
  } else if (!toMeta.includes('public')) {
    return navigateTo({
      path: nuxtApp.$localePath('/auth/sign-in'),
      query: { redirect: to.fullPath },
    })
  }
})
