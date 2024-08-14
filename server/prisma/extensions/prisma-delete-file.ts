import { unlink } from 'node:fs/promises'
import { Prisma } from '@prisma/client'

const FILES_PATH = import.meta.env.FILES_PATH

export const prismaDeleteFileExtension = Prisma.defineExtension({
  name: 'deleteFileFromDisk',
  query: {
    file: {
      delete: async ({ query, args }) => {
        args.select = {
          id: true,
          path: true,
        }

        const file = await query(args)

        // Remove file from disk
        if (file?.path) {
          try {
            unlink(`${FILES_PATH}/${file.path}`)
          } catch (error) {}
        }

        return file
      },
      deleteMany: async ({ query, args }) => {
        const files = await query(args)

        // Remove files from disk
        if (Array.isArray(files)) {
          files.forEach(file => {
            if (file?.path) {
              try {
                unlink(`${FILES_PATH}/${file.path}`)
              } catch (error) {}
            }
          })
        }

        return files
      },
    },
  },
})
