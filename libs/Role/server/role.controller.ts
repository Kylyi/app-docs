import type { Role } from '@prisma/client'
import { runRoleSeed } from '~/libs/Role/server/role.seed'

import {
  RoleCreateArgsSchema,
  RoleDeleteArgsSchema,
  RoleFindFirstArgsSchema,
  RoleFindManyArgsSchema,
  RoleUpdateArgsSchema,
} from '~z'

// The fields that should be searchable
const SEARCH_FIELDS: Array<keyof Role> = ['name', 'description']

export const roleRouter = router({
  // Find one
  findOne: protectedProcedure
    .input(extendWithSearch(RoleFindFirstArgsSchema))
    .query(async ({ input, ctx }) => {
      const { args, search } = input || {}

      return ctx.prisma.role.findFirstWithSearch(
        args,
        getSearch(search, SEARCH_FIELDS),
      )
    }),

  // Find many
  findMany: protectedProcedure
    .input(extendWithMeta(extendWithSearch(RoleFindManyArgsSchema)))
    .query(async ({ input, ctx }) => {
      const { args, search, includeCount, includeModel } = input || {}

      return {
        data: await ctx.prisma.role.findManyWithSearch(
          args,
          getSearch(search, SEARCH_FIELDS),
        ),

        // Count
        ...(includeCount && {
          count: await ctx.prisma.role.countWithSearch(
            args,
            getSearch(search, SEARCH_FIELDS),
          ),
        }),

        // Model
        ...(includeModel && {
          model: 'Role',
        }),
      }
    }),

  // Create one
  createOne: protectedProcedure
    .input(RoleCreateArgsSchema)
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.role.create(input)
    }),

  // Update one
  updateOne: protectedProcedure
    .input(RoleUpdateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.prisma.role.update(input)
    }),

  // Delete one
  deleteOne: protectedProcedure
    .input(RoleDeleteArgsSchema)
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.role.delete(input)
    }),

  // DEV ONLY
  // Seed
  seed: seedProcedure.mutation(async ({ ctx }) => {
    const count = await ctx.prisma.role.count()

    if (count > 0) {
      throw new Error('Roles already seeded')
    }

    await runRoleSeed()
  }),
})
