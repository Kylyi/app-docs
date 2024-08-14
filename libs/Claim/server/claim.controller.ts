import type { Claim } from '@prisma/client'
import { runClaimSeed } from '~/libs/Claim/server/claim.seed'

import {
  ClaimCreateArgsSchema,
  ClaimDeleteArgsSchema,
  ClaimFindFirstArgsSchema,
  ClaimFindManyArgsSchema,
  ClaimUpdateArgsSchema,
} from '~z'

// The fields that should be searchable
const SEARCH_FIELDS: Array<keyof Claim> = ['name']

export const claimRouter = router({
  // Find one
  findOne: protectedProcedure
    .input(extendWithSearch(ClaimFindFirstArgsSchema))
    .query(async ({ input, ctx }) => {
      const { args, search } = input || {}

      return ctx.prisma.claim.findFirstWithSearch(
        args,
        getSearch(search, SEARCH_FIELDS),
      )
    }),

  // Find many
  findMany: protectedProcedure
    .input(extendWithMeta(extendWithSearch(ClaimFindManyArgsSchema)))
    .query(async ({ input, ctx }) => {
      const { args, search, includeCount, includeModel } = input || {}

      return {
        data: await ctx.prisma.claim.findManyWithSearch(
          args,
          getSearch(search, SEARCH_FIELDS),
        ),

        // Count
        ...(includeCount && {
          count: await ctx.prisma.claim.countWithSearch(
            args,
            getSearch(search, SEARCH_FIELDS),
          ),
        }),

        // Model
        ...(includeModel && {
          model: 'Claim',
        }),
      }
    }),

  // Create one
  createOne: protectedProcedure
    .input(ClaimCreateArgsSchema)
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.claim.create(input)
    }),

  // Update one
  updateOne: protectedProcedure
    .input(ClaimUpdateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.prisma.claim.update(input)
    }),

  // Delete one
  deleteOne: protectedProcedure
    .input(ClaimDeleteArgsSchema)
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.claim.delete(input)
    }),

  // DEV ONLY
  // Seed
  seed: seedProcedure.mutation(async ({ ctx }) => {
    await runClaimSeed()
  }),
})
