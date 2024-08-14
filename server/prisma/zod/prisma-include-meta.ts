import type { ZodType } from 'zod'
import { z } from 'zod'

export function extendWithMeta<T>(schema: ZodType<T>) {
  return schema
    .and(
      z.object({
        includeCount: z.boolean().optional(),
        includeModel: z.boolean().optional(),
      }),
    )
    .optional()
}
