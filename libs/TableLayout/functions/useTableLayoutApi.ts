import type { Prisma, TableLayout } from '@prisma/client'
import type { ProcedureOptions } from '@trpc/server'

import type {
  TableLayoutCreateArgsSchema,
  TableLayoutDeleteArgsSchema,
  TableLayoutFindFirstArgsSchema,
  TableLayoutFindManyArgsSchema,
  TableLayoutUpdateArgsSchema,
  TableLayoutUpsertArgsSchema,
} from '~z'

// Types
import type {
  IPrismaResult,
  IPrismaResultArray,
} from '~/libs/App/types/prisma/prisma-result.type'

export function useTableLayoutApi() {
  const { $client } = useNuxtApp()

  // Find one
  async function tableLayoutFindOne<
    T extends $infer<typeof TableLayoutFindFirstArgsSchema>,
  >(
    payload?: {
      args?: Prisma.SelectSubset<T, Prisma.TableLayoutFindFirstArgs>
      search?: string
    },
    options?: ProcedureOptions,
  ) {
    type IResponse = IPrismaResult<
      Prisma.TableLayoutGetPayload<T>,
      typeof $client.tableLayout.findOne.query,
      TableLayout
    >

    return $client.tableLayout.findOne.query(
      payload,
      options,
    ) as Promise<IResponse>
  }

  // Find all
  async function tableLayoutFindMany<
    T extends $infer<typeof TableLayoutFindManyArgsSchema>,
  >(
    payload?: {
      args?: Prisma.SelectSubset<T, Prisma.TableLayoutFindManyArgs>
      search?: string
      includeCount?: boolean
    },
    options?: ProcedureOptions,
  ) {
    type IResponse = IPrismaResultArray<
      Prisma.TableLayoutGetPayload<T>,
      typeof $client.tableLayout.findMany.query,
      TableLayout
    >

    return $client.tableLayout.findMany.query(
      payload,
      options,
    ) as Promise<IResponse>
  }

  // Create one
  async function tableLayoutCreateOne<
    T extends $infer<typeof TableLayoutCreateArgsSchema>,
  >(
    args: Prisma.SelectSubset<T, Prisma.TableLayoutCreateArgs>,
    options?: ProcedureOptions,
  ) {
    type IResponse = IPrismaResult<
      Prisma.TableLayoutGetPayload<T>,
      typeof $client.tableLayout.createOne.mutate,
      TableLayout
    >

    return $client.tableLayout.createOne.mutate(
      args,
      options,
    ) as Promise<IResponse>
  }

  // Update one
  async function tableLayoutUpdateOne<
    T extends $infer<typeof TableLayoutUpdateArgsSchema>,
  >(
    args: Prisma.SelectSubset<T, Prisma.TableLayoutUpdateArgs>,
    options?: ProcedureOptions,
  ) {
    type IResponse = IPrismaResult<
      Prisma.TableLayoutGetPayload<T>,
      typeof $client.tableLayout.updateOne.mutate,
      TableLayout
    >

    return $client.tableLayout.updateOne.mutate(
      args,
      options,
    ) as Promise<IResponse>
  }

  // Upsert one
  async function tableLayoutUpsertOne<
    T extends $infer<typeof TableLayoutUpsertArgsSchema>,
  >(args: Prisma.SelectSubset<T, Prisma.TableLayoutUpsertArgs>) {
    type IResponse = IPrismaResult<
      Prisma.TableLayoutGetPayload<T>,
      typeof $client.tableLayout.upsertOne.mutate,
      TableLayout
    >

    return $client.tableLayout.upsertOne.mutate(args) as Promise<IResponse>
  }

  // Delete one
  async function tableLayoutDeleteOne<
    T extends $infer<typeof TableLayoutDeleteArgsSchema>,
  >(
    args: Prisma.SelectSubset<T, Prisma.TableLayoutDeleteArgs>,
    options?: ProcedureOptions,
  ) {
    type IResponse = IPrismaResult<
      Prisma.TableLayoutGetPayload<T>,
      typeof $client.tableLayout.deleteOne.mutate,
      TableLayout
    >

    return $client.tableLayout.deleteOne.mutate(
      args,
      options,
    ) as Promise<IResponse>
  }

  return {
    tableLayoutFindOne,
    tableLayoutFindMany,
    tableLayoutCreateOne,
    tableLayoutDeleteOne,
    tableLayoutUpdateOne,
    tableLayoutUpsertOne,
  }
}
