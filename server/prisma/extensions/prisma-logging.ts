import { Prisma } from '@prisma/client'
import { camelCase, isBuffer, omit } from 'lodash-es'
import { diff } from 'deep-object-diff'
import { prisma } from '~/server/prisma'

// Types
import type { IItem } from '~/libs/Shared/types/item.type'
import { LogOperationEnum } from '~/libs/Log/enums/log-operation.enum'

const LOGGABLE_OPERATIONS = ['create', 'update', 'delete']

const NON_LOGGABLE_MODELS: Prisma.ModelName[] = ['Log']

const COMPUTED_PROPERTIES = ['fullName'] as const
const NON_LOGGABLE_PROPERTIES = ['id', ...COMPUTED_PROPERTIES] as const

const OPERATION_MAP = {
  findFirst: LogOperationEnum.OTHER,
  findMany: LogOperationEnum.OTHER,
  count: LogOperationEnum.OTHER,
  findFirstOrThrow: LogOperationEnum.OTHER,
  findUnique: LogOperationEnum.OTHER,
  findUniqueOrThrow: LogOperationEnum.OTHER,
  create: LogOperationEnum.CREATE,
  createMany: LogOperationEnum.CREATE,
  update: LogOperationEnum.UPDATE,
  updateMany: LogOperationEnum.UPDATE,
  upsert: LogOperationEnum.UPSERT,
  delete: LogOperationEnum.DELETE,
  deleteMany: LogOperationEnum.DELETE,
  aggregate: LogOperationEnum.OTHER,
  groupBy: LogOperationEnum.OTHER,
  createManyAndReturn: LogOperationEnum.CREATE,
} satisfies Record<string, LogOperationEnum>

async function createLog(
  oldValue: IItem | null,
  options: { id: number, model: string, operation: LogOperationEnum },
) {
  const { id, model, operation } = options

  if (oldValue === null) {
    await prisma.log.create({
      data: {
        diff: '<Created>',
        operation,
        entity: model,
        entityId: id,
      },
    })

    return
  }

  // We get the new value after the query
  // @ts-expect-error Prisma stuff
  const newValue = await prisma[model].findFirst({ where: { id } })

  // We get the diff
  const _diff = diff(
    omit(oldValue, NON_LOGGABLE_PROPERTIES),
    omit(newValue, NON_LOGGABLE_PROPERTIES),
  )

  const diffKeys = Object.keys(_diff)
  const diffTransformed: string[][] = []
  diffKeys.forEach(key => {
    diffTransformed.push([key, oldValue[key], newValue[key]])
  })

  await prisma.log.createMany({
    data: diffTransformed.map(diff => {
      const parsedDiff = diff.map(value => {
        // Buffer
        if (isBuffer(value)) {
          return '<Buffer>'
        }

        // Object
        if (typeof value === 'object') {
          return JSON.stringify(value, null, 2)
        }

        return value
      })

      return {
        diff: parsedDiff.join(';'),
        operation,
        entity: model,
        entityId: id,
      }
    }),
  })
}

export const prismaLogExtension = Prisma.defineExtension({
  name: 'logging',
  query: {
    $allModels: {
      $allOperations: async ({ args, model, operation, query }) => {
        const isLoggableOperation = LOGGABLE_OPERATIONS.includes(operation)
        const isLoggableModel = !NON_LOGGABLE_MODELS.includes(model)

        if (isLoggableOperation && isLoggableModel) {
          const _model = camelCase(model)

          // We get old value before the query
          let oldValue: any = null

          if (operation === 'update') {
            // @ts-expect-error Prisma stuff
            oldValue = await prisma[_model].findUnique({ where: args.where })
          }

          // We make sure ID is always returned
          if ('select' in args) {
            args.select = {
              ...(args.select as IItem),
              id: true,
            }
          }

          // We run the query
          const result = await query(args)

          if (result && typeof result === 'object' && 'id' in result) {
            setTimeout(async () => {
              await createLog(oldValue, {
                id: result.id as number,
                model: _model,
                operation: OPERATION_MAP[operation],
              })
            }, 500)
          }

          return result
        }

        return query(args)
      },
    },
  },
})
