export function seedGuardMiddleware() {
  return middleware(async ev => {
    const { next } = ev
    const seedHash = getCookie(ev.ctx.ev, 'SEED_HASH')

    if (!seedHash || seedHash !== import.meta.env.VITE_SEED_HASH) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Unauthorized',
      })
    }

    return next()
  })
}
