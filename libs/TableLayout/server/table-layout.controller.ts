import type { TableLayout } from '@prisma/client'

import {
  TableLayoutCreateArgsSchema,
  TableLayoutDeleteArgsSchema,
  TableLayoutFindFirstArgsSchema,
  TableLayoutFindManyArgsSchema,
  TableLayoutUpdateArgsSchema,
  TableLayoutUpsertArgsSchema,
} from '~z'

// The fields that should be searchable
const SEARCH_FIELDS: Array<keyof TableLayout> = ['name', 'tableName']

export const tableLayoutRouter = router({
  // Find one
  findOne: protectedProcedure
    .input(extendWithSearch(TableLayoutFindFirstArgsSchema))
    .query(async ({ input, ctx }) => {
      const { args, search } = input || {}

      return ctx.prisma.tableLayout.findFirstWithSearch(
        args,
        getSearch(search, SEARCH_FIELDS),
      )
    }),

  // Find many
  findMany: protectedProcedure
    .input(extendWithMeta(extendWithSearch(TableLayoutFindManyArgsSchema)))
    .query(async ({ input, ctx }) => {
      const { args, search, includeCount, includeModel } = input || {}

      return {
        data: await ctx.prisma.tableLayout.findManyWithSearch(
          args,
          getSearch(search, SEARCH_FIELDS),
        ),

        // Count
        ...(includeCount && {
          count: await ctx.prisma.tableLayout.countWithSearch(
            args,
            getSearch(search, SEARCH_FIELDS),
          ),
        }),

        // Model
        ...(includeModel && {
          model: 'TableLayout',
        }),
      }
    }),

  // Create one
  createOne: protectedProcedure
    .input(TableLayoutCreateArgsSchema)
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.tableLayout.create(input)
    }),

  // Update one
  updateOne: protectedProcedure
    .input(TableLayoutUpdateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.prisma.tableLayout.update(input)
    }),

  // Upsert one
  upsertOne: protectedProcedure
    .input(TableLayoutUpsertArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.prisma.tableLayout.upsert(input)
    }),

  // Delete one
  deleteOne: protectedProcedure
    .input(TableLayoutDeleteArgsSchema)
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.tableLayout.delete(input)
    }),
})
