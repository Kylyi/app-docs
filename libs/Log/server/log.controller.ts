import type { Log } from '@prisma/client'

import {
  LogCreateArgsSchema,
  LogDeleteArgsSchema,
  LogFindFirstArgsSchema,
  LogFindManyArgsSchema,
  LogUpdateArgsSchema,
} from '~/prisma/generated/zod'

// import { exportData } from '~/server/utils/exportData'

// The fields that should be searchable
const SEARCH_FIELDS: Array<keyof Log> = ['diff']

export const logRouter = router({
  // Find one
  findOne: publicProcedure
    .input(extendWithSearch(LogFindFirstArgsSchema))
    .query(async ({ input, ctx }) => {
      const { args, search } = input || {}

      return ctx.prisma.log.findFirstWithSearch(
        args,
        getSearch(search, SEARCH_FIELDS),
      )
    }),

  // Find many
  findMany: publicProcedure
    .input(extendWithMeta(extendWithSearch(LogFindManyArgsSchema)))
    .query(async ({ input, ctx }) => {
      const { args, search, includeCount, includeModel } = input || {}

      return {
        data: await ctx.prisma.log.findManyWithSearch(
          args,
          getSearch(search, SEARCH_FIELDS),
        ),

        // Count
        ...(includeCount && {
          count: await ctx.prisma.log.countWithSearch(
            args,
            getSearch(search, SEARCH_FIELDS),
          ),
        }),

        // Model
        ...(includeModel && {
          model: 'Log',
        }),
      }
    }),

  // Create one
  createOne: publicProcedure
    .input(LogCreateArgsSchema)
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.log.create(input)
    }),

  // Update one
  updateOne: publicProcedure
    .input(LogUpdateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.prisma.log.update(input)
    }),

  // Delete one
  deleteOne: publicProcedure
    .input(LogDeleteArgsSchema)
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.log.delete(input)
    }),

  // Dev only
  // Delete all
  deleteAll: publicProcedure.mutation(async ({ ctx }) => {
    return ctx.prisma.log.deleteMany({})
  }),
})
