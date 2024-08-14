import type { File } from '@prisma/client'

import {
  FileCreateArgsSchema,
  FileDeleteArgsSchema,
  FileDeleteManyArgsSchema,
  FileFindFirstArgsSchema,
  FileFindManyArgsSchema,
  FileUpdateArgsSchema,
} from '~z'

// The fields that should be searchable
const SEARCH_FIELDS: Array<keyof File> = ['name']

export const fileRouter = router({
  // Find one
  findOne: protectedProcedure
    .input(extendWithSearch(FileFindFirstArgsSchema))
    .query(async ({ input, ctx }) => {
      const { args, search } = input || {}

      return ctx.prisma.file.findFirstWithSearch(
        args,
        getSearch(search, SEARCH_FIELDS),
      )
    }),

  // Find many
  findMany: protectedProcedure
    .input(extendWithMeta(extendWithSearch(FileFindManyArgsSchema)))
    .query(async ({ input, ctx }) => {
      const { args, search, includeCount, includeModel } = input || {}

      return {
        data: await ctx.prisma.file.findManyWithSearch(
          args,
          getSearch(search, SEARCH_FIELDS),
        ),

        // Count
        ...(includeCount && {
          count: await ctx.prisma.file.countWithSearch(
            args,
            getSearch(search, SEARCH_FIELDS),
          ),
        }),

        // Model
        ...(includeModel && {
          model: 'File',
        }),
      }
    }),

  // Create one
  createOne: protectedProcedure
    .input(FileCreateArgsSchema)
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.file.create(input)
    }),

  // Update one
  updateOne: protectedProcedure
    .input(FileUpdateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.prisma.file.update(input)
    }),

  // Delete one
  deleteOne: protectedProcedure
    .input(FileDeleteArgsSchema)
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.file.delete(input)
    }),

  // Delete many
  deleteMany: protectedProcedure
    .input(FileDeleteManyArgsSchema)
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.file.deleteMany(input)
    }),
})
