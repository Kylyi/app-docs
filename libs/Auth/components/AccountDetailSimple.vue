<script setup lang="ts">
import type { LocaleObject } from '@nuxtjs/i18n'

// Utils
const { color: themeColor } = useTheme()
const { locale, locales } = useI18n()

// Layout
const localeCookie = useCookie('lang', { path: '/', sameSite: 'lax' })

const _locales = computed(() => locales.value as LocaleObject[])

function handleSetLocale(_locale: LocaleObject, callback?: () => void) {
  // const localePath = switchLocalePath(_locale.code)
  // history.replaceState(null, '', localePath)
  locale.value = _locale.code
  localeCookie.value = _locale.code

  // useHead({ htmlAttrs: { lang: locale.code } })
  callback?.()
}
</script>

<template>
  <Section2
    flex="~ col !gap-1"
    :ui="{ sectionClass: 'bg-white dark:bg-darker !p-0' }"
    p="!t-0"
  >
    <!-- <TextInput
      :model-value="currentUser?.email"
      readonly
      no-copy
      :inline="false"
    /> -->

    <!-- Go to instances selection -->
    <Btn
      icon="i-mdi:home-city-outline"
      :label="$t('instance.switch')"
      :to="$p('/instances/selection')"
      no-active-link
      no-uppercase
      align="left"
    />

    <!-- Locale -->
    <Selector
      :label="$t('general.locale')"
      :model-value="locale"
      :options="_locales"
      option-key="code"
      option-label="name"
      layout="label-inside"
      no-border
      no-search
      :ui="{ inputContainerClass: '!dark:bg-true-gray-800 !bg-truegray-100' }"
      @update:model-value="handleSetLocale($event)"
    >
      <template #prepend>
        <div class="i-clarity:language-line color-ca m-l-3 w-22px h-22px" />
      </template>

      <template #item="{ item }">
        <div
          :class="item.icon"
          shrink-0
        />
        <div
          grow
          p="l-1"
        >
          {{ item.name }}
        </div>
      </template>
    </Selector>

    <!-- Theme -->
    <ThemeToggle
      label-class="m-l-2 !font-size-4"
      :label="$t(`app.theme.${themeColor}`)"
      size="xs"
      :no-hover-effect="false"
      :container-class="['h-9 p-x-2']"
      :visuals="{
        unchecked: {
          bullet: 'bg-transparent',
          toggle: '!bg-black',
          icon: 'i-material-symbols:dark-mode-outline-rounded color-white !w-34 !h-4',
        },
        checked: {
          bullet: 'bg-transparent',
          icon: 'i-humbleicons:sun color-black !w-4 !h-4',
        },
      }"
    />

    <Btn
      :label="$t('auth.account')"
      bg="primary"
      color="!white"
      to="/me"
      no-uppercase
      m="t-3"
    />
  </Section2>
</template>
