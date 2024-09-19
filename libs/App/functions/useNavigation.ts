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
        label: 'Button',
        icon: 'i-formkit:button',
        to: $p('/components/button'),
      },
      {
        id: 'checkbox',
        label: 'Checkbox',
        icon: 'i-eva:checkmark-square-2-outline',
        to: $p('/components/checkbox'),
      },
      {
        id: 'radio',
        label: 'Radio',
        icon: 'i-eva:radio-button-on-outline',
        to: $p('/components/radio'),
      },
      {
        id: 'toggle',
        label: 'Toggle',
        icon: 'i-eva:toggle-left-outline',
        to: $p('/components/toggle'),
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
