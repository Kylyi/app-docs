import type { Prisma } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { prisma } from '~/server/prisma'

async function createUsers() {
  const adminRole = await prisma.role.findFirst({
    where: { name: 'admin' },
  })

  // Create user
  const users: Prisma.UserCreateInput[] = [{
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    roles: { connect: { id: adminRole?.id } },
  }]

  return users
}

export async function runUserSeed() {
  const users = await createUsers()

  for await (const user of users) {
    await prisma.user.create({
      data: user,
    })
  }
}
