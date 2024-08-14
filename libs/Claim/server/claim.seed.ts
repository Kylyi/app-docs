import type { Prisma } from '@prisma/client'
import { prisma } from '~/server/prisma'

// General claims
const generalClaims: Prisma.ClaimCreateInput[] = [
  { name: 'all:read' },
  { name: 'all:create' },
  { name: 'all:update' },
  { name: 'all:delete' },
]

// Users
const userClaims: Prisma.ClaimCreateInput[] = [
  { name: 'user:read' },
  { name: 'user:create' },
  { name: 'user:update' },
  { name: 'user:delete' },
]

// Enumerators
const enumeratorClaims: Prisma.ClaimCreateInput[] = [
  { name: 'enumerator:read' },
  { name: 'enumerator:create' },
  { name: 'enumerator:update' },
  { name: 'enumerator:delete' },
]

// Enumerator options
const enumeratorOptionClaims: Prisma.ClaimCreateInput[] = [
  { name: 'enumeratorOption:read' },
  { name: 'enumeratorOption:create' },
  { name: 'enumeratorOption:update' },
  { name: 'enumeratorOption:delete' },
]

// Organizations
const organizationClaims: Prisma.ClaimCreateInput[] = [
  { name: 'organization:read' },
  { name: 'organization:create' },
  { name: 'organization:update' },
  { name: 'organization:delete' },
]

// Boards
const boardClaims: Prisma.ClaimCreateInput[] = [
  { name: 'board:read' },
  { name: 'board:create' },
  { name: 'board:update' },
  { name: 'board:delete' },
]

// Tasks
const taskClaims: Prisma.ClaimCreateInput[] = [
  { name: 'task:read' },
  { name: 'task:create' },
  { name: 'task:update' },
  { name: 'task:delete' },
]

// Task assignments
const taskAssignmentClaims: Prisma.ClaimCreateInput[] = [
  { name: 'taskAssignment:read' },
  { name: 'taskAssignment:create' },
  { name: 'taskAssignment:update' },
  { name: 'taskAssignment:delete' },
]

// Contacts
const contactClaims: Prisma.ClaimCreateInput[] = [
  { name: 'contact:read' },
  { name: 'contact:create' },
  { name: 'contact:update' },
  { name: 'contact:delete' },
]

// Attendance
const attendanceClaims: Prisma.ClaimCreateInput[] = [
  { name: 'attendance:read' },
  { name: 'attendance:create' },
  { name: 'attendance:update' },
  { name: 'attendance:delete' },
]

// Roles
const roleClaims: Prisma.ClaimCreateInput[] = [
  { name: 'role:read' },
  { name: 'role:create' },
  { name: 'role:update' },
  { name: 'role:delete' },
]

// Board columns
const boardColumnClaims: Prisma.ClaimCreateInput[] = [
  { name: 'boardColumn:read' },
  { name: 'boardColumn:create' },
  { name: 'boardColumn:update' },
  { name: 'boardColumn:delete' },
]

// Tags
const tagClaims: Prisma.ClaimCreateInput[] = [
  { name: 'tag:read' },
  { name: 'tag:create' },
  { name: 'tag:update' },
  { name: 'tag:delete' },
]

// User invitations
const userInvitationClaims: Prisma.ClaimCreateInput[] = [
  { name: 'userInvitation:read' },
  { name: 'userInvitation:create' },
  { name: 'userInvitation:update' },
  { name: 'userInvitation:delete' },
]

// Files
const fileClaims: Prisma.ClaimCreateInput[] = [
  { name: 'file:read' },
  { name: 'file:create' },
  { name: 'file:update' },
  { name: 'file:delete' },
]

// Board on Organization
const boardOnOrganizationClaims: Prisma.ClaimCreateInput[] = [
  { name: 'boardOnOrganization:read' },
  { name: 'boardOnOrganization:create' },
  { name: 'boardOnOrganization:update' },
  { name: 'boardOnOrganization:delete' },
]

// User on Organization
const userOnOrganizationClaims: Prisma.ClaimCreateInput[] = [
  { name: 'userOnOrganization:read' },
  { name: 'userOnOrganization:create' },
  { name: 'userOnOrganization:update' },
  { name: 'userOnOrganization:delete' },
]

export const CLAIMS = {
  general: generalClaims,

  attendance: attendanceClaims,
  board: boardClaims,
  boardOnOrganization: boardOnOrganizationClaims,
  contact: contactClaims,
  enumerator: enumeratorClaims,
  enumeratorOption: enumeratorOptionClaims,
  files: fileClaims,
  organization: organizationClaims,
  role: roleClaims,
  boardColumn: boardColumnClaims,
  tag: tagClaims,
  task: taskClaims,
  taskAssignment: taskAssignmentClaims,
  user: userClaims,
  userInvitation: userInvitationClaims,
  userOnOrganization: userOnOrganizationClaims,
}

export async function runClaimSeed() {
  const claims = Object.values(CLAIMS).flat()

  for await (const claim of claims) {
    await prisma.claim.upsert({
      where: { name: claim.name },
      update: {},
      create: claim,
    })
  }
}
