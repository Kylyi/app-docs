import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { writeFileSync } from 'node:fs'
import { resolveConfig } from 'unocss'

// Vite plugins
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// i18n
import { LOCALES, LOCALE_DEFAULT, PAGES_MAP } from './utils/i18n'

// UnoCSS
import config from './unocss.config'

// https://github.com/prisma/prisma/issues/12504
const prismaClientPath = createRequire(import.meta.url).resolve(
  '@prisma/client',
)

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    'nuxt-lodash',
    '@nuxtjs/i18n',
    '@nuxtjs/device',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@vueuse/motion/nuxt',
    '@nuxtjs/fontaine',
    '@nuxt/eslint',
  ],

  // Modules setup
  // NOTE - There is also i18n.config.ts
  i18n: {
    strategy: 'prefix_and_default',
    skipSettingLocaleOnNavigate: true,
    defaultLocale: LOCALE_DEFAULT,
    detectBrowserLanguage: false,
    customRoutes: 'config',
    pages: PAGES_MAP,
    locales: LOCALES,
    experimental: {
      localeDetector: './server/i18n/i18n-locale-detector.ts',
    },
  },

  lodash: { prefix: '' },

  eslint: {
    config: {
      standalone: false,
      stylistic: true,
    },
  },

  // CSS https://nuxt.com/docs/api/nuxt-config#css
  css: [
    '~/components/__css/components.theme.scss',
    '~/css/reset.scss',
    '~/css/colors.scss',
    '~/css/typography.scss',
    '~/css/main.scss',
    '~/css/theme.scss',
    '~/css/breakpoints.scss',
    '~/css/zindex.scss',
    '~/css/ripple.scss',
    '~/css/project-specific.scss',
  ],

  unocss: { preflight: false },

  // Experimental features https://nuxt.com/docs/api/nuxt-config#experimental
  experimental: {
    componentIslands: true,
    typedPages: true,
  },

  // Imports https://nuxt.com/docs/api/nuxt-config#imports
  imports: {
    imports: [
      { from: 'vue', name: 'MaybeRefOrGetter', type: true },
      { from: 'uuid', name: 'v4', as: 'uuid' },
      { from: 'zod', name: 'z' },
    ],
    dirs: [
      './libs/App/functions/**/*',
      './libs/Shared/functions/**/*',
      './libs/Shared/types',
      './libs/App/globals',
      './libs/App/utils',
      './libs/App/types',
      './utils/zod',
      './utils/helpers/**/*',
      './components/Notification/functions/**/*',
    ],
  },

  vue: {
    compilerOptions: {
      isCustomElement: tag => tag === 'iconify-icon',
    },
  },

  // Typescript https://nuxt.com/docs/api/nuxt-config#typescript
  typescript: {
    // typeCheck: process.env.NODE_ENV === 'development',
    shim: false,
    typeCheck: false,
  },

  // Components https://nuxt.com/docs/api/nuxt-config#components
  components: {
    dirs: [
      { path: './components', pathPrefix: false },
      { path: './libs', pathPrefix: false },
    ],
  },

  // Runtime config https://nuxt.com/docs/api/nuxt-config#runtimeconfig
  runtimeConfig: {
    public: {
      i18nDefaultLanguage: process.env.NUXT_I18N_DEFAULT_LOCALE,
      FILES_HOST: process.env.FILES_HOST,
      BACKEND_URL: process.env.BACKEND_URL,
      VITE_COOKIE_DOMAIN: process.env.VITE_COOKIE_DOMAIN,
    },
  },

  // Nitro (Nuxt BE) https://nuxt.com/docs/api/nuxt-config#runtimeconfig
  nitro: {
    compressPublicAssets: true,
    experimental: {
      asyncContext: true,
    },
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    imports: {
      imports: [
        { from: 'zod', name: 'z' },
        { from: '@trpc/server', name: 'TRPCError' },
        { from: '~/libs/Shared/functions/dayjs', name: '$date' },
        { from: '~/libs/Shared/functions/dayjs', name: '$duration' },
      ],
      dirs: [
        './server/utils/**/*',
        './server/prisma/zod/**/*',
        './utils/helpers/**/*',
      ],
    },
    alias: {
      '~z': fileURLToPath(new URL('./prisma/generated/zod', import.meta.url)),
    },
  },

  features: {
    inlineStyles: false,
  },

  hooks: {
    'build:before': () => {
      console.log('\n')
      console.log('✔ Creating colors.json file...')

      writeFileSync('./libs/App/constants/colors.json', JSON.stringify(resolveConfig(config).theme.colors, null, 2), 'utf8')

      // console.log('✔ Creating safelist of icons....')
      // const carbonIcons = Object.keys(icons).map(icon => `i-carbon:${icon}`)
      // writeFileSync(
      //   './libs/App/constants/icons.json',
      //   JSON.stringify(carbonIcons, null, 2),
      //   'utf8',
      // )
    },
  },

  // App options https://nuxt.com/docs/api/nuxt-config#app
  app: {
    head: {
      titleTemplate: '%s | APP',
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/nuxt.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'app' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'theme-color', media: '(prefers-color-scheme: light)', content: 'white' },
        { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#222222' },
      ],
    },
  },

  // Vite & Vue features https://nuxt.com/docs/api/nuxt-config#vite
  vite: {
    plugins: [nodePolyfills()],
    resolve: {
      alias: {
        // https://github.com/prisma/prisma/issues/12504
        '.prisma/client/index-browser': prismaClientPath.replace(
          '@prisma/client/default.js',
          '.prisma/client/index-browser.js',
        ),
      },
    },
  },

  build: {
    transpile: ['trpc-nuxt'],
  },

  // Dev options
  devServer: {
    host: '127.0.0.1',
    port: 3000,
  },

  devtools: {
    enabled: true,

    timeline: {
      enabled: false,
    },
  },

  ignore: ['**/generated/**/*'],

  alias: {
    '~z': fileURLToPath(new URL('./prisma/generated/zod', import.meta.url)),
  },

  // SSR https://nuxt.com/docs/api/nuxt-config#ssr
  ssr: false,
})
