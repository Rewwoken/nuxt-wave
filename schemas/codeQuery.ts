import { z } from 'zod';

export const codeQuerySchema = z
  .object({
    id: z.string(),
    code: z.string(),
  });

export type CodeQuerySchema = z.infer<typeof codeQuerySchema>;
