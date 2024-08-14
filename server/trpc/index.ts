// Core
import { authRouter } from '~/libs/Auth/server/auth.controller'
import { fileRouter } from '~/libs/File/server/file.controller'
import { logRouter } from '~/libs/Log/server/log.controller'
import { tableLayoutRouter } from '~/libs/TableLayout/server/table-layout.controller'
import { userRouter } from '~/libs/User/server/user.controller'
import { userOptionsRouter } from '~/libs/UserOptions/server/user-options.controller'

// Libs
import { claimRouter } from '~/libs/Claim/server/claim.controller'
import { roleRouter } from '~/libs/Role/server/role.controller'

export const appRouter = router({
  // Core
  auth: authRouter,
  file: fileRouter,
  log: logRouter,
  tableLayout: tableLayoutRouter,
  user: userRouter,
  userOptions: userOptionsRouter,

  // Libs
  claim: claimRouter,
  role: roleRouter,

  // Other
  // ares: aresRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
