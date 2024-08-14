import {
  UserOptionsCreateArgsSchema,
  UserOptionsDeleteArgsSchema,
  UserOptionsFindFirstArgsSchema,
  UserOptionsFindManyArgsSchema,
  UserOptionsUpdateArgsSchema,
} from '~z'

export const userOptionsRouter = router({
  // Find one
  findOne: protectedProcedure
    .input(extendWithSearch(UserOptionsFindFirstArgsSchema))
    .query(async ({ input, ctx }) => {
      const { args } = input || {}

      return ctx.prisma.userOptions.findFirstWithSearch(args)
    }),

  // Find many
  findMany: protectedProcedure
    .input(extendWithSearch(UserOptionsFindManyArgsSchema))
    .query(async ({ input, ctx }) => {
      const { args } = input || {}

      return {
        data: await ctx.prisma.userOptions.findManyWithSearch(args),
        count: await ctx.prisma.userOptions.countWithSearch(args),
      }
    }),

  // Create one
  createOne: protectedProcedure
    .input(UserOptionsCreateArgsSchema)
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.userOptions.create(input)
    }),

  // Update one
  updateOne: protectedProcedure
    .input(UserOptionsUpdateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.prisma.userOptions.update(input)
    }),

  // Delete one
  deleteOne: protectedProcedure
    .input(UserOptionsDeleteArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.prisma.userOptions.delete(input)
    }),
})
