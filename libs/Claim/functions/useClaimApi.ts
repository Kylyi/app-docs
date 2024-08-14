import type { Claim, Prisma } from '@prisma/client'
import type { ProcedureOptions } from '@trpc/server'

import type {
  ClaimCreateArgsSchema,
  ClaimDeleteArgsSchema,
  ClaimFindFirstArgsSchema,
  ClaimFindManyArgsSchema,
  ClaimUpdateArgsSchema,
} from '~z'
// Types
import type {
  IPrismaResult,
  IPrismaResultArray,
} from '~/libs/App/types/prisma/prisma-result.type'

export function useClaimApi() {
  const { $client } = useNuxtApp()

  // Find one
  async function claimFindOne<T extends $infer<typeof ClaimFindFirstArgsSchema>>(
    payload?: {
      args?: Prisma.SelectSubset<T, Prisma.ClaimFindFirstArgs>
      search?: string
    },
    options?: ProcedureOptions,
  ) {
    type IResponse = IPrismaResult<
      Prisma.ClaimGetPayload<T>,
      typeof $client.claim.findOne.query,
      Claim
    >

    return $client.claim.findOne.query(payload, options) as Promise<IResponse>
  }

  // Find all
  async function claimFindMany<T extends $infer<typeof ClaimFindManyArgsSchema>>(
    payload?: {
      args?: Prisma.SelectSubset<T, Prisma.ClaimFindManyArgs>
      search?: string
      includeCount?: boolean
    },
    options?: ProcedureOptions,
  ) {
    type IResponse = IPrismaResultArray<
      Prisma.ClaimGetPayload<T>,
      typeof $client.claim.findMany.query,
      Claim
    >

    return $client.claim.findMany.query(payload, options) as Promise<IResponse>
  }

  // Create one
  async function claimCreateOne<T extends $infer<typeof ClaimCreateArgsSchema>>(
    args: Prisma.SelectSubset<T, Prisma.ClaimCreateArgs>,
    options?: ProcedureOptions,
  ) {
    type IResponse = IPrismaResult<
      Prisma.ClaimGetPayload<T>,
      typeof $client.claim.createOne.mutate,
      Claim
    >

    return $client.claim.createOne.mutate(args, options) as Promise<IResponse>
  }

  // Update one
  async function claimUpdateOne<T extends $infer<typeof ClaimUpdateArgsSchema>>(
    args: Prisma.SelectSubset<T, Prisma.ClaimUpdateArgs>,
    options?: ProcedureOptions,
  ) {
    type IResponse = IPrismaResult<
      Prisma.ClaimGetPayload<T>,
      typeof $client.claim.updateOne.mutate,
      Claim
    >

    return $client.claim.updateOne.mutate(args, options) as Promise<IResponse>
  }

  // Delete one
  async function claimDeleteOne<T extends $infer<typeof ClaimDeleteArgsSchema>>(
    args: Prisma.SelectSubset<T, Prisma.ClaimDeleteArgs>,
    options?: ProcedureOptions,
  ) {
    type IResponse = IPrismaResult<
      Prisma.ClaimGetPayload<T>,
      typeof $client.claim.deleteOne.mutate,
      Claim
    >

    return $client.claim.deleteOne.mutate(args, options) as Promise<IResponse>
  }

  return {
    claimFindOne,
    claimFindMany,
    claimCreateOne,
    claimDeleteOne,
    claimUpdateOne,
  }
}
