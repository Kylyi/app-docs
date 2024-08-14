import type { ComponentInternalInstance } from 'vue'
import type { z } from 'zod'
import { v4 as uuid } from 'uuid'
import type { RouteLocationRaw } from 'vue-router'
import { klona } from 'klona/full'
import { navigateTo } from '#app'
import type { TranslateOptions } from '#i18n'

// Types
import type { NavigateToOptions } from '~/shims'

export function $log(...args: any) {
  return console.log(...args)
}

/**
 * Navigate to localized path
 */
export function $nav(
  route: RouteLocationRaw,
  locale?: string | undefined,
  options?: NavigateToOptions,
) {
  const nuxtApp = useNuxtApp()

  navigateTo(nuxtApp.$localePath(route, locale), options)
}

/**
 * Localized path
 */
export function $p(route: RouteLocationRaw, locale?: string | undefined) {
  const { $localePath } = useNuxtApp()

  return $localePath(route, locale || undefined)
}

/**
 * i18n.t
 */
export function $t(
  key: string,
  plural?: any,
  options?: TranslateOptions,
) {
  const { $i18n } = useNuxtApp()

  const _options = options ?? { locale: $i18n.locale.value }

  return plural
    ? $i18n.t(key, plural as string, _options)
    : $i18n.t(key, plural as string, _options)
}

export function klone<T = any>(object: any) {
  const { cloned } = useCloned<T>(object, { clone: klona })

  return cloned
}

export function generateUUID() {
  return uuid()
}

/**
 * Transliteration from cyrillic to latin
 */
export function $toBoldLatin(
  word: string = '',
  options?: { allowedCharsRegex?: RegExp, returnUnmatched?: boolean },
): string {
  const { allowedCharsRegex = /^[0-9a-zA-Z ]+$/, returnUnmatched = false }
    = options || {}

  const map = new Map<string, string>([
    ['А', 'a'],
    ['а', 'a'],
    ['Б', 'b'],
    ['б', 'b'],
    ['В', 'v'],
    ['в', 'v'],
    ['Г', 'g'],
    ['г', 'g'],
    ['Д', 'd'],
    ['д', 'd'],
    ['Ђ', 'dj'],
    ['ђ', 'dj'],
    ['Е', 'e'],
    ['е', 'e'],
    ['Ж', 'z'],
    ['ж', 'z'],
    ['З', 'z'],
    ['з', 'z'],
    ['И', 'i'],
    ['и', 'i'],
    ['Ј', 'j'],
    ['ј', 'j'],
    ['К', 'k'],
    ['к', 'k'],
    ['Л', 'l'],
    ['л', 'l'],
    ['Љ', 'lj'],
    ['љ', 'lj'],
    ['М', 'm'],
    ['м', 'm'],
    ['Н', 'n'],
    ['н', 'n'],
    ['Њ', 'nj'],
    ['њ', 'nj'],
    ['О', 'o'],
    ['о', 'o'],
    ['П', 'p'],
    ['п', 'p'],
    ['Р', 'r'],
    ['р', 'r'],
    ['С', 's'],
    ['с', 's'],
    ['Т', 't'],
    ['т', 't'],
    ['Ћ', 'c'],
    ['ћ', 'c'],
    ['У', 'u'],
    ['у', 'u'],
    ['Ф', 'f'],
    ['ф', 'f'],
    ['Х', 'h'],
    ['х', 'h'],
    ['Ц', 'c'],
    ['ц', 'c'],
    ['Ч', 'c'],
    ['ч', 'c'],
    ['Џ', 'dz'],
    ['џ', 'dz'],
    ['Ш', 's'],
    ['ш', 's'],
    ['Č', 'c'],
    ['č', 'c'],
    ['Ć', 'c'],
    ['ć', 'c'],
    ['Š', 's'],
    ['š', 's'],
    ['Đ', 'dj'],
    ['đ', 'dj'],
    ['Ž', 'z'],
    ['ž', 'z'],
  ])

  return Array.from(word)
    .map(char => {
      if (map.has(char)) {
        return map.get(char)
      }

      if (returnUnmatched || allowedCharsRegex?.test(char)) {
        return char
      }

      return ''
    })
    .join('')
}

/**
 * Exposes API client
 */
export function $api() {
  const { $client } = useNuxtApp()

  return $client
}

/**
 * Checks if user is SUPER ADMIN
 */
export function $isSA() {
  const currentUser = useCurrentUserState()

  return currentUser.value?.id === 1
}

/**
 * Runs function only if user is NOT SUPER ADMIN
 */
export function $runAsNonSA<T extends Function>(fnc: T) {
  if ($isSA()) {
    return
  }

  return fnc()
}

/**
 * Closes the current dialog/menu
 *
 * If we provide `instance` argument, it will close the dialog/menu
 * of that instance, otherwise it will close the latest dialog/menu
 */
export function $hide(options?: {
  /**
   * When providing `instance`, the function will close the floating element that
   * the `instance` is inside of
   */
  instance?: ComponentInternalInstance | null

  /**
   * When true, all the floating UIs will be hidden (with exception of `ignore`d elements)
   *
   * NOTE: When `all` is true, the `instance` does nothing
   */
  all?: boolean

  /**
   * A list of elements that should not be hidden
   */
  ignore?: Element[]

  /**
   * When provided, only the elements *after` (in DOM) will get hidden
   *
   * NOTE: Takes precedence over `ignore`
   */
  ignoreUntilEl?: Element | null
}) {
  let { instance, all, ignore = [], ignoreUntilEl } = options ?? {}

  if (all) {
    const floatingEls = Array.from(
      document.querySelectorAll('.floating-element'),
    )

    if (ignoreUntilEl) {
      const idx = floatingEls.findIndex(el => el === ignoreUntilEl)

      ignore = floatingEls.slice(0, idx + 1)
    }

    floatingEls?.forEach(el => {
      const isIgnored = ignore.includes(el)

      if (!isIgnored) {
        // @ts-expect-error DOM attribute
        el?.hide()
      }
    })

    return
  }

  if (instance) {
    const floatingEl = instance?.vnode.el?.closest('.floating-element')

    floatingEl?.hide()
  } else {
    const floatingEl = document.querySelector('.floating-element:last-child')

    const isIgnored = floatingEl && ignore.includes(floatingEl)

    if (!isIgnored) {
      // @ts-expect-error DOM attribute
      floatingEl?.hide()
    }
  }
}

export type $infer<T extends z.ZodType<any, any, any>> = z.infer<T>
