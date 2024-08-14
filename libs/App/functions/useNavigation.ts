// @unocss-include

export function useNavigation() {
  // Utils
  const route = useRoute()

  // Navigation
  const navigationSections = computed<INavigationLink[]>(() => {
    return [
      // Dashboard
      {
        id: 'button',
        label: $t('general.dashboard'),
        icon: 'i-formkit:button',
        to: $p('/components/button'),
      },
    ]
  })

  const bottomSections = computed<INavigationLink[]>(() => {
    return []
  })

  return {
    navigationSections,
    bottomSections,
  }
}
