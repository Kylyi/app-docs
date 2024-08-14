import type { File, Prisma } from '@prisma/client'
import type { ProcedureOptions } from '@trpc/server'

import type {
  FileCreateArgsSchema,
  FileDeleteArgsSchema,
  FileFindFirstArgsSchema,
  FileFindManyArgsSchema,
  FileUpdateArgsSchema,
} from '~z'

// Types
import type {
  IPrismaResult,
  IPrismaResultArray,
} from '~/libs/App/types/prisma/prisma-result.type'
import type { RouterInput } from '~/utils/router/types/router.type'

export function useFileApi() {
  const { $client } = useNuxtApp()

  // Find one
  async function fileFindOne<
    T extends $infer<typeof FileFindFirstArgsSchema>,
  >(payload?: {
    args?: Prisma.SelectSubset<T, Prisma.FileFindFirstArgs>
    search?: string
  }) {
    type IResponse = IPrismaResult<
      Prisma.FileGetPayload<T>,
      typeof $client.file.findOne.query,
      File
    >

    return $client.file.findOne.query(payload) as Promise<IResponse>
  }

  // Find all
  async function fileFindMany<
    T extends $infer<typeof FileFindManyArgsSchema>,
  >(payload?: {
    args?: Prisma.SelectSubset<T, Prisma.FileFindManyArgs>
    search?: string
  }) {
    type IResponse = IPrismaResultArray<
      Prisma.FileGetPayload<T>,
      typeof $client.file.findMany.query,
      File
    >

    return $client.file.findMany.query(payload) as Promise<IResponse>
  }

  // Create one
  async function fileCreateOne<T extends $infer<typeof FileCreateArgsSchema>>(
    args: Prisma.SelectSubset<T, Prisma.FileCreateArgs>,
  ) {
    type IResponse = IPrismaResult<
      Prisma.FileGetPayload<T>,
      typeof $client.file.createOne.mutate,
      File
    >

    return $client.file.createOne.mutate(args) as Promise<IResponse>
  }

  // Update one
  async function fileUpdateOne<T extends $infer<typeof FileUpdateArgsSchema>>(
    args: Prisma.SelectSubset<T, Prisma.FileUpdateArgs>,
  ) {
    type IResponse = IPrismaResult<
      Prisma.FileGetPayload<T>,
      typeof $client.file.updateOne.mutate,
      File
    >

    return $client.file.updateOne.mutate(args) as Promise<IResponse>
  }

  // Delete one
  async function fileDeleteOne<T extends $infer<typeof FileDeleteArgsSchema>>(
    args: Prisma.SelectSubset<T, Prisma.FileDeleteArgs>,
  ) {
    type IResponse = IPrismaResult<
      Prisma.FileGetPayload<T>,
      typeof $client.file.deleteOne.mutate,
      File
    >

    return $client.file.deleteOne.mutate(args) as Promise<IResponse>
  }

  // Delete many
  async function fileDeleteMany(payload: {
    args: RouterInput['file']['deleteMany']
    options?: ProcedureOptions
  }) {
    return $client.file.deleteMany.mutate(payload.args, payload.options)
  }

  return {
    fileFindOne,
    fileFindMany,
    fileCreateOne,
    fileDeleteOne,
    fileDeleteMany,
    fileUpdateOne,
  }
}
