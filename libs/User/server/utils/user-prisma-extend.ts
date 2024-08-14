import { Prisma } from '@prisma/client'

export const userAutoCreateOptions = Prisma.defineExtension({
  name: 'autoCreateOptions',
  query: {
    user: {
      async create({ query, args }) {
        if (!args.data.options) {
          args.data.options = {
            create: {},
          }
        }

        return query(args)
      },
    },
  },
})
