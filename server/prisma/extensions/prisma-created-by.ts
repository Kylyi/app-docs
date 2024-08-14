import { Prisma } from '@prisma/client'

export const prismaCreatedByFileExtension = Prisma.defineExtension({
  name: 'createdBy',
  query: {
    $allModels: {
      create: async ({ query, args }) => {
        const { context } = useEvent()

        args.data.createdById = context.auth?.id

        return query(args)
      },
    },
  },
})
