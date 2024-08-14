import type { H3Event } from 'h3'
import type { inferAsyncReturnType } from '@trpc/server'
import { prisma } from '~/server/prisma'

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export function createContext(ev: H3Event) {
  return {
    ev,
    prisma,
  }
}

export type Context = inferAsyncReturnType<typeof createContext>
