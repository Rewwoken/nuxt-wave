import { z } from 'zod';

export const codeSchema = z
  .object({
    id: z.string(),
    code: z.string(),
  });

export type CodeSchema = z.infer<typeof codeSchema>;
