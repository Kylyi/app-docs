import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'
import type { AppRouter } from '~/server/api/trpc/[trpc]'

export type RouterInput = inferRouterInputs<AppRouter>
export type RouterOutput = inferRouterOutputs<AppRouter>
