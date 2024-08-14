import { PrismaClient } from '@prisma/client'

// Extensions
import { userAutoCreateOptions } from '~/libs/User/server/utils/user-prisma-extend'
import { prismaCreatedByFileExtension } from '~/server/prisma/extensions/prisma-created-by'
import { prismaDeleteFileExtension } from '~/server/prisma/extensions/prisma-delete-file'
import { prismaLogExtension } from '~/server/prisma/extensions/prisma-logging'
import { prismaSearchExtension } from '~/server/prisma/extensions/prisma-search'

export const prisma = new PrismaClient()
  // Model extensions
  .$extends(prismaSearchExtension)

  // Query extensions
  .$extends(userAutoCreateOptions)
  .$extends(prismaDeleteFileExtension)
  .$extends(prismaLogExtension)
  .$extends(prismaCreatedByFileExtension)
