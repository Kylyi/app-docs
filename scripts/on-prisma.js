import { $, file, fileURLToPath, write } from 'bun'

const isDirectCall = import.meta.url === `file://${process.argv[1]}`
const cwd = fileURLToPath(new URL('../', import.meta.url))

export async function runOnPrisma() {
  console.log('Running on-prisma script...', isDirectCall ? 'directly' : 'indirectly')

  // Add the `@no-check` comment to the generated Prisma file
  const prismaGeneratedFilePath = `${cwd}/.zenstack/prisma/generated/zod/index.ts`
  const prismaGeneratedFile = file(prismaGeneratedFilePath)
  let prismaGeneratedFileText = await prismaGeneratedFile.text()

  prismaGeneratedFileText = `// @ts-nocheck
  ${prismaGeneratedFileText}
  `

  // Modify the `JsonValueSchema` to a simple `any` type
  // TODO: This solution should be temporary and each `Json` type should have its own validations
  const rowsSplit = prismaGeneratedFileText.split('\n')
  let row20 = rowsSplit[19]
  row20 = row20.replace('Prisma.JsonValue', 'any')

  rowsSplit[19] = row20

  prismaGeneratedFileText = rowsSplit.join('\n')

  write(prismaGeneratedFilePath, prismaGeneratedFileText)

  // Remove the existing Prisma folder and replace it with the new one
  await $`rm -rf ${cwd}/prisma`
  await $`mv ${cwd}/.zenstack/prisma ./prisma`
}

if (isDirectCall) {
  await runOnPrisma()
}
