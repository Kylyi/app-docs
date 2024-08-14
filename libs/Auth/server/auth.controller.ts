// Functions
import { setAuthCookies } from '~/libs/Auth/server/functions/create-user-token-payload'

export const authRouter = router({
  // Sign in
  signIn: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { id } = input || {}

      return setAuthCookies(id, { ctx })
    }),

  // Refresh token
  refreshToken: protectedProcedure.mutation(({ ctx }) => ctx.user),

  // Logout
  logout: publicProcedure.mutation(async ({ ctx }) => {
    setCookie(ctx.ev, '_accessToken', '', {
      maxAge: -1,
      httpOnly: true,
      domain: import.meta.env.VITE_COOKIE_DOMAIN,
    })
    setCookie(ctx.ev, '_refreshToken', '', {
      maxAge: -1,
      httpOnly: true,
      domain: import.meta.env.VITE_COOKIE_DOMAIN,
    })

    return true
  }),
})
