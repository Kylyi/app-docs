import { Prisma } from '@prisma/client'
import { set } from 'lodash-es'
import { configBE } from '~/config/be-index'

// Types
import type { IItem } from '~/libs/Shared/types/item.type'

export const prismaSearchExtension = Prisma.defineExtension({
  name: 'search',
  model: {
    $allModels: {
      // Find first with the possibility to add a search query for given fields
      async findFirstWithSearch<T>(
        this: T,
        args?: Prisma.Args<T, 'findFirst'>,
        search?: { q?: string, fields: string[] },
      ): Promise<Prisma.Result<T, Prisma.Args<T, 'findFirst'>, 'findFirst'>> {
        // Get the current model at runtime
        const context = Prisma.getExtensionContext(this)

        // Search
        if (!search?.q) {
          return (context as any).findFirst(args)
        }

        const { fields, q } = search
        const searchExpressions: IItem[] = []

        fields.forEach(key => {
          const searchObj: IItem = {}

          set(searchObj, key, {
            contains: q,
            ...(configBE.useInsensitiveFilter && {
              mode: 'insensitive',
            }),
          })

          searchExpressions.push(searchObj)
        })

        if (args) {
          args.where = {
            AND: [args.where ?? {}, { OR: searchExpressions }],
          }
        }

        return (context as any).findFirst(args)
      },

      // Find many with the possibility to add a search query for given fields
      async findManyWithSearch<T>(
        this: T,
        args?: Prisma.Args<T, 'findMany'>,
        search?: { q?: string, fields: string[] },
      ): Promise<Prisma.Result<T, Prisma.Args<T, 'findMany'>, 'findMany'>> {
        // Get the current model at runtime
        const context = Prisma.getExtensionContext(this)

        // Search
        if (!search?.q) {
          return (context as any).findMany(args)
        }

        const { fields, q } = search
        const searchExpressions: IItem[] = []

        fields.forEach(key => {
          const searchObj: IItem = {}

          set(searchObj, key, {
            contains: q,
            ...(configBE.useInsensitiveFilter && {
              mode: 'insensitive',
            }),
          })

          searchExpressions.push(searchObj)
        })

        if (args) {
          args.where = {
            AND: [args.where ?? {}, { OR: searchExpressions }],
          }
        }

        return (context as any).findMany(args)
      },

      // Count with the possibility to add a search query for given fields
      async countWithSearch<T>(
        this: T,
        args?: Prisma.Args<T, 'findMany'>,
        search?: {
          q?: string
          fields: string[]
          /**
           * The `countWithSearch` will most likely be called in combination with `findManyWithSearch`
           * As the `args` are reused, the `findManyWithSearch` most likely already adjusted the `args`
           * If that's the case, we don't want to adjust the `args` again, so we
           * set the `alreadyAdjusted` to `true` to skip the adjustment
           */
          alreadyAdjusted?: boolean
        },
      ): Promise<Prisma.Result<T, Prisma.Args<T, 'count'>, 'count'>> {
        // Get the current model at runtime
        const context = Prisma.getExtensionContext(this)

        if (args) {
          // We remove the fields that count doesn't support
          delete args.distinct
          delete args.select
          delete args.take
          delete args.skip
        }

        // Search
        if (!search?.q || search.alreadyAdjusted) {
          return (context as any).count(args)
        }

        const { fields, q } = search
        const searchExpressions: IItem[] = []

        fields.forEach(key => {
          const searchObj: IItem = {}

          set(searchObj, key, {
            contains: q,
            ...(configBE.useInsensitiveFilter && {
              mode: 'insensitive',
            }),
          })

          searchExpressions.push(searchObj)
        })

        if (args) {
          args.where = {
            AND: [args.where ?? {}, { OR: searchExpressions }],
          }
        }

        return (context as any).count(args)
      },
    },
  },
})
