import type { Claim, Prisma } from '@prisma/client'
import { prisma } from '~/server/prisma'

function createAdminRole(
  claimsByName: Record<string, Claim>,
): Prisma.RoleCreateInput {
  return {
    name: 'admin',

    // Relations
    claims: {
      connect: [claimsByName.claimOne, claimsByName.claimTwo],
    },
  }
}

function createUserRole(
  claimsByName: Record<string, Claim>,
): Prisma.RoleCreateInput {
  return {
    name: 'user',

    // Relations
    claims: {
      connect: [claimsByName.claimOne],
    },
  }
}

async function createRoles() {
  const claims = await prisma.claim.findMany()

  const claimsByName = claims.reduce((agg, claim) => {
    agg[claim.name] = claim

    return agg
  }, {} as Record<string, Claim>)

  // Create Admin and User roles for each instance
  const roles: Prisma.RoleCreateInput[] = [
    createAdminRole(claimsByName),
    createUserRole(claimsByName),
  ]

  return roles
}

export async function runRoleSeed() {
  const roles = await createRoles()

  for await (const role of roles) {
    await prisma.role.create({ data: role })
  }
}
