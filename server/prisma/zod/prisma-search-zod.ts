import type { ZodType } from 'zod'
import { z } from 'zod'

export function extendWithSearch<T, K>(
  schema: ZodType<T>,
  options: K = {} as K,
) {
  return z
    .object({
      // @ts-expect-error zod
      args: schema.default(() => ({})),
      search: z.string().optional(),
      ...options,
    })
    .optional()
}
