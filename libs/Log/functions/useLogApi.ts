import type { Log, Prisma } from '@prisma/client'
import type { ProcedureOptions } from '@trpc/server'

import type {
  LogCreateArgsSchema,
  LogDeleteArgsSchema,
  LogFindFirstArgsSchema,
  LogFindManyArgsSchema,
  LogUpdateArgsSchema,
} from '~z'
// Types
import type {
  IPrismaResult,
  IPrismaResultArray,
} from '~/libs/App/types/prisma/prisma-result.type'

export function useLogApi() {
  const { $client } = useNuxtApp()

  // Find one
  async function logFindOne<T extends $infer<typeof LogFindFirstArgsSchema>>(
    payload?: {
      args?: Prisma.SelectSubset<T, Prisma.LogFindFirstArgs>
      search?: string
    },
    options?: ProcedureOptions,
  ) {
    type IResponse = IPrismaResult<
      Prisma.LogGetPayload<T>,
      typeof $client.log.findOne.query,
      Log
    >

    return $client.log.findOne.query(payload, options) as Promise<IResponse>
  }

  // Find all
  async function logFindMany<T extends $infer<typeof LogFindManyArgsSchema>>(
    payload?: {
      args?: Prisma.SelectSubset<T, Prisma.LogFindManyArgs>
      search?: string
      includeCount?: boolean
    },
    options?: ProcedureOptions,
  ) {
    type IResponse = IPrismaResultArray<
      Prisma.LogGetPayload<T>,
      typeof $client.log.findMany.query,
      Log
    >

    return $client.log.findMany.query(payload, options) as Promise<IResponse>
  }

  // Create one
  async function logCreateOne<T extends $infer<typeof LogCreateArgsSchema>>(
    args: Prisma.SelectSubset<T, Prisma.LogCreateArgs>,
    options?: ProcedureOptions,
  ) {
    type IResponse = IPrismaResult<
      Prisma.LogGetPayload<T>,
      typeof $client.log.createOne.mutate,
      Log
    >

    return $client.log.createOne.mutate(args, options) as Promise<IResponse>
  }

  // Update one
  async function logUpdateOne<T extends $infer<typeof LogUpdateArgsSchema>>(
    args: Prisma.SelectSubset<T, Prisma.LogUpdateArgs>,
    options?: ProcedureOptions,
  ) {
    type IResponse = IPrismaResult<
      Prisma.LogGetPayload<T>,
      typeof $client.log.updateOne.mutate,
      Log
    >

    return $client.log.updateOne.mutate(args, options) as Promise<IResponse>
  }

  // Delete one
  async function logDeleteOne<T extends $infer<typeof LogDeleteArgsSchema>>(
    args: Prisma.SelectSubset<T, Prisma.LogDeleteArgs>,
    options?: ProcedureOptions,
  ) {
    type IResponse = IPrismaResult<
      Prisma.LogGetPayload<T>,
      typeof $client.log.deleteOne.mutate,
      Log
    >

    return $client.log.deleteOne.mutate(args, options) as Promise<IResponse>
  }

  return {
    logFindOne,
    logFindMany,
    logCreateOne,
    logDeleteOne,
    logUpdateOne,
  }
}
