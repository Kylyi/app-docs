// Config
import production from './production.json'
import local from './local.json'

const CONFIG_MAP = {
  production,
  local,
}

const environment: keyof typeof CONFIG_MAP = import.meta.env.VITE_ENV || 'local'
const BASE_CONFIG = CONFIG_MAP[environment]

export const SHARED_CONFIG = {
  /**
   * If true, `{ mode: 'insensitive' }` will be added to the filter field query
   *
   * Usage: Prisma ORM
   */
  useInsensitiveFilter: BASE_CONFIG.useInsensitiveFilter,

  // Session Timeout
  sessionTimeoutMinutes: BASE_CONFIG.sessionTimeoutMinutes,
}
