/**
 * Checks whether the provided seed hash is valid when seeding the database
 */
export function checkSeedHash(seedHash: string) {
  const isValid = seedHash === import.meta.env.VITE_SEED_HASH

  if (isValid) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Unathorized',
    })
  }
}
