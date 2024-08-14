import { stat } from 'node:fs/promises'
import { pick } from 'lodash-es'
import { runUserSeed } from '~/libs/User/server/user.seed'

import {
  type User,
  UserCreateArgsSchema,
  UserDeleteArgsSchema,
  UserFindFirstArgsSchema,
  UserFindManyArgsSchema,
  type UserOptionalDefaultsWithRelations,
  UserSchema,
  UserUpdateArgsSchema,
  UserUpsertArgsSchema,
} from '~z'

// Functions
import { generateAvatar } from '~/libs/Shared/server/utils/avatar'

// The fields that should be searchable
const SEARCH_FIELDS: Array<ObjectKey<UserOptionalDefaultsWithRelations>> = [
  'firstName',
  'lastName',
]

export const userRouter = router({
  // Find one
  findOne: protectedProcedure
    .input(extendWithSearch(UserFindFirstArgsSchema))
    .query(async ({ input, ctx }) => {
      const { args, search } = input || {}

      return ctx.prisma.user.findFirstWithSearch(
        args,
        getSearch(search, SEARCH_FIELDS),
      )
    }),

  // Find many
  findMany: protectedProcedure
    .input(extendWithMeta(extendWithSearch(UserFindManyArgsSchema)))
    .query(async ({ input, ctx }) => {
      const { args, search, includeCount, includeModel } = input || {}

      return {
        data: await ctx.prisma.user.findManyWithSearch(
          args,
          getSearch(search, SEARCH_FIELDS),
        ),

        // Count
        ...(includeCount && {
          count: await ctx.prisma.user.countWithSearch(
            pick(args, ['where', 'skip', 'take', 'orderBy']),
            getSearch(search, SEARCH_FIELDS),
          ),
        }),

        // Model
        ...(includeModel && {
          model: 'User',
        }),
      }
    }),

  // Create one
  createOne: protectedProcedure
    .input(z.object({
      args: UserCreateArgsSchema,
      generateAvatar: z.boolean().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const { args } = input

      if (input.generateAvatar) {
        const avatar = generateAvatar(`${args.data.firstName} ${args.data.lastName}`)
        const filePath = `/avatars/${generateRandomUUID()}.svg`

        await avatar.toFile(`${import.meta.env.FILES_PATH}${filePath}`)

        const { size } = await stat(`${import.meta.env.FILES_PATH}${filePath}`)

        args.data.avatar = {
          create: {
            name: 'avatar',
            path: filePath,
            size,
            type: 'image/svg+xml',
          },
        }
      }

      return ctx.prisma.user.create(args)
    }),

  // Update one
  updateOne: protectedProcedure
    .input(UserUpdateArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.prisma.user.update(input)
    }),

  // Upsert one
  upsertOne: protectedProcedure
    .input(UserUpsertArgsSchema)
    .mutation(({ input, ctx }) => {
      return ctx.prisma.user.upsert(input)
    }),

  // Delete one
  deleteOne: protectedProcedure
    .input(UserDeleteArgsSchema)
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.user.delete(input)
    }),

  // DEV ONLY
  // Seed
  seed: seedProcedure.mutation(async ({ ctx }) => {
    await runUserSeed()
  }),

  // Custom
  // Regenerate avatar
  regenerateAvatar: protectedProcedure
    .input(z.object({ userId: z.number(), seed: z.string().optional() }))
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.prisma.$transaction(async prisma => {
        const user = await ctx.prisma.user.findFirst({
          where: { id: input.userId },
        })

        if (!user) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'User not found',
          })
        }

        // Remove old avatar
        if (user.avatarId) {
          await prisma.file.delete({
            where: { id: user.avatarId },
          })
        }

        // Generate new avatar
        const avatar = generateAvatar(input.seed ?? `${user.firstName} ${user.lastName}`)
        const filePath = `/avatars/${generateRandomUUID()}.svg`

        await avatar.toFile(`${import.meta.env.FILES_PATH}${filePath}`)
        const { size } = await stat(`${import.meta.env.FILES_PATH}${filePath}`)

        // Update user
        return prisma.user.update({
          where: { id: input.userId },
          data: {
            avatar: {
              create: {
                name: 'avatar',
                path: filePath,
                size,
                type: 'image/svg+xml',
              },
            },
          },
          include: { avatar: true },
        })
      })

      return res.avatar
    }),
})
