import type { Prisma, Role } from '@prisma/client'
import type { ProcedureOptions } from '@trpc/server'

import type {
  RoleCreateArgsSchema,
  RoleDeleteArgsSchema,
  RoleFindFirstArgsSchema,
  RoleFindManyArgsSchema,
  RoleUpdateArgsSchema,
} from '~z'
// Types
import type {
  IPrismaResult,
  IPrismaResultArray,
} from '~/libs/App/types/prisma/prisma-result.type'

export function useRoleApi() {
  const { $client } = useNuxtApp()

  // Find one
  async function roleFindOne<T extends $infer<typeof RoleFindFirstArgsSchema>>(
    payload?: {
      args?: Prisma.SelectSubset<T, Prisma.RoleFindFirstArgs>
      search?: string
    },
    options?: ProcedureOptions,
  ) {
    type IResponse = IPrismaResult<
      Prisma.RoleGetPayload<T>,
      typeof $client.role.findOne.query,
      Role
    >

    return $client.role.findOne.query(payload, options) as Promise<IResponse>
  }

  // Find all
  async function roleFindMany<T extends $infer<typeof RoleFindManyArgsSchema>>(
    payload?: {
      args?: Prisma.SelectSubset<T, Prisma.RoleFindManyArgs>
      search?: string
      includeCount?: boolean
    },
    options?: ProcedureOptions,
  ) {
    type IResponse = IPrismaResultArray<
      Prisma.RoleGetPayload<T>,
      typeof $client.role.findMany.query,
      Role
    >

    return $client.role.findMany.query(payload, options) as Promise<IResponse>
  }

  // Create one
  async function roleCreateOne<T extends $infer<typeof RoleCreateArgsSchema>>(
    args: Prisma.SelectSubset<T, Prisma.RoleCreateArgs>,
    options?: ProcedureOptions,
  ) {
    type IResponse = IPrismaResult<
      Prisma.RoleGetPayload<T>,
      typeof $client.role.createOne.mutate,
      Role
    >

    return $client.role.createOne.mutate(args, options) as Promise<IResponse>
  }

  // Update one
  async function roleUpdateOne<T extends $infer<typeof RoleUpdateArgsSchema>>(
    args: Prisma.SelectSubset<T, Prisma.RoleUpdateArgs>,
    options?: ProcedureOptions,
  ) {
    type IResponse = IPrismaResult<
      Prisma.RoleGetPayload<T>,
      typeof $client.role.updateOne.mutate,
      Role
    >

    return $client.role.updateOne.mutate(args, options) as Promise<IResponse>
  }

  // Delete one
  async function roleDeleteOne<T extends $infer<typeof RoleDeleteArgsSchema>>(
    args: Prisma.SelectSubset<T, Prisma.RoleDeleteArgs>,
    options?: ProcedureOptions,
  ) {
    type IResponse = IPrismaResult<
      Prisma.RoleGetPayload<T>,
      typeof $client.role.deleteOne.mutate,
      Role
    >

    return $client.role.deleteOne.mutate(args, options) as Promise<IResponse>
  }

  return {
    roleFindOne,
    roleFindMany,
    roleCreateOne,
    roleDeleteOne,
    roleUpdateOne,
  }
}
