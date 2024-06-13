import { z } from 'zod'

export const readCsvSchema = z.object({
  path: z.string(),
})
