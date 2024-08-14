import { writeFile } from 'node:fs/promises'
import { createNuxtApiHandler } from 'trpc-nuxt'
import { createContext } from '~/server/trpc/context'
import { appRouter } from '~/server/trpc'

export type AppRouter = typeof appRouter

// export API handler
export default createNuxtApiHandler({
  router: appRouter,
  createContext,
  onError: ({ error }) => {
    // Save the error to a log file...
    writeFile(`errors/${new Date().toISOString()}.json`, error.message)
  },
})
