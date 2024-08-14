import type { [FTName | PascalCase] } from '@prisma/client'

import { [FTName | PascalCase]CreateArgsSchema } from '~z'
import { [FTName | PascalCase]DeleteArgsSchema } from '~z'
import { [FTName | PascalCase]FindFirstArgsSchema } from '~z'
import { [FTName | PascalCase]FindManyArgsSchema } from '~z'
import { [FTName | PascalCase]UpdateArgsSchema } from '~z'
import type { [FTName | PascalCase]OptionalDefaultsWithRelations } from '~z'



// The fields that should be searchable
const SEARCH_FIELDS: Array<ObjectKey<[FTName | PascalCase]OptionalDefaultsWithRelations>> = ['name']

export const [FTName | camelCase]Router = router({
  // Find one
  findOne: protectedProcedure
    .input(extendWithSearch([FTName | PascalCase]FindFirstArgsSchema))
    .query(async ({ input, ctx }) => {
      const { args, search } = input || {}

      return ctx.prisma.[FTName | camelCase].findFirstWithSearch(
        args,
        getSearch(search, SEARCH_FIELDS)
      )
    }),

  // Find many
  findMany: protectedProcedure
    .input(extendWithMeta(extendWithSearch([FTName | PascalCase]FindManyArgsSchema)))
    .query(async ({ input, ctx }) => {
      const { args, search, includeCount, includeModel } = input || {}

      return {
        data: await ctx.prisma.[FTName | camelCase].findManyWithSearch(
          args,
          getSearch(search, SEARCH_FIELDS)
        ),

        // Count
        ...(includeCount && {
          count: await ctx.prisma.[FTName | camelCase].countWithSearch(
            args,
            getSearch(search, SEARCH_FIELDS)
          ),
        }),

        // Model
        ...(includeModel && {
          model: '[FTName | PascalCase]',
        }),
      }
    }),

  // Create one
  createOne: protectedProcedure
    .input([FTName | PascalCase]CreateArgsSchema)
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.[FTName | camelCase].create(input)
    }),

  // Update one
  updateOne: protectedProcedure
    .input([FTName | PascalCase]UpdateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.prisma.[FTName | camelCase].update(input)
    }),

  // Delete one
  deleteOne: protectedProcedure
    .input([FTName | PascalCase]DeleteArgsSchema)
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.[FTName | camelCase].delete(input)
    }),
})
