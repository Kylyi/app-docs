import type { Prisma, [FTName | PascalCase] } from '@prisma/client'
import type { ProcedureOptions } from '@trpc/server'

import type {
  [FTName | PascalCase]CreateArgsSchema,
  [FTName | PascalCase]DeleteArgsSchema,
  [FTName | PascalCase]FindFirstArgsSchema,
  [FTName | PascalCase]FindManyArgsSchema,
  [FTName | PascalCase]UpdateArgsSchema,
} from '~z'
// Types
import type {
  IPrismaResult,
  IPrismaResultArray,
} from '~/libs/App/types/prisma/prisma-result.type'

export function use[FTName | PascalCase]Api() {
  const { $client } = useNuxtApp()

  // Find one
  async function [FTName | camelCase]FindOne<T extends $infer<typeof [FTName | PascalCase]FindFirstArgsSchema>>(
    payload?: {
      args?: Prisma.SelectSubset<T, Prisma.[FTName | PascalCase]FindFirstArgs>
      search?: string,
    },
    options?: ProcedureOptions
  ) {
    type IResponse = IPrismaResult<
      Prisma.[FTName | PascalCase]GetPayload<T>,
      typeof $client.[FTName | camelCase].findOne.query,
      [FTName | PascalCase]
    >

    return $client.[FTName | camelCase].findOne.query(payload, options) as Promise<IResponse>
  }

  // Find all
  async function [FTName | camelCase]FindMany<T extends $infer<typeof [FTName | PascalCase]FindManyArgsSchema>>(
    payload?: {
      args?: Prisma.SelectSubset<T, Prisma.[FTName | PascalCase]FindManyArgs>
      search?: string
      includeCount?: boolean
    },
    options?: ProcedureOptions
  ) {
    type IResponse = IPrismaResultArray<
      Prisma.[FTName | PascalCase]GetPayload<T>,
      typeof $client.[FTName | camelCase].findMany.query,
      [FTName | PascalCase]
    >

    return $client.[FTName | camelCase].findMany.query(payload, options) as Promise<IResponse>
  }

  // Create one
  async function [FTName | camelCase]CreateOne<T extends $infer<typeof [FTName | PascalCase]CreateArgsSchema>>(
    args: Prisma.SelectSubset<T, Prisma.[FTName | PascalCase]CreateArgs>,
    options?: ProcedureOptions
  ) {
    type IResponse = IPrismaResult<
      Prisma.[FTName | PascalCase]GetPayload<T>,
      typeof $client.[FTName | camelCase].createOne.mutate,
      [FTName | PascalCase]
    >

    return $client.[FTName | camelCase].createOne.mutate(args, options) as Promise<IResponse>
  }

  // Update one
  async function [FTName | camelCase]UpdateOne<T extends $infer<typeof [FTName | PascalCase]UpdateArgsSchema>>(
    args: Prisma.SelectSubset<T, Prisma.[FTName | PascalCase]UpdateArgs>,
    options?: ProcedureOptions
  ) {
    type IResponse = IPrismaResult<
      Prisma.[FTName | PascalCase]GetPayload<T>,
      typeof $client.[FTName | camelCase].updateOne.mutate,
      [FTName | PascalCase]
    >

    return $client.[FTName | camelCase].updateOne.mutate(args, options) as Promise<IResponse>
  }

  // Delete one
  async function [FTName | camelCase]DeleteOne<T extends $infer<typeof [FTName | PascalCase]DeleteArgsSchema>>(
    args: Prisma.SelectSubset<T, Prisma.[FTName | PascalCase]DeleteArgs>,
    options?: ProcedureOptions
  ) {
    type IResponse = IPrismaResult<
      Prisma.[FTName | PascalCase]GetPayload<T>,
      typeof $client.[FTName | camelCase].deleteOne.mutate,
      [FTName | PascalCase]
    >

    return $client.[FTName | camelCase].deleteOne.mutate(args, options) as Promise<IResponse>
  }

  return {
    [FTName | camelCase]FindOne,
    [FTName | camelCase]FindMany,
    [FTName | camelCase]CreateOne,
    [FTName | camelCase]DeleteOne,
    [FTName | camelCase]UpdateOne,
  }
}
