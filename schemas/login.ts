import { z } from 'zod';

export const loginSchema = z
  .object({
    username: z
      .string({ message: 'Username is required!' })
      .min(1, { message: 'Username is required!' }),
    password: z
      .string({ message: 'Password is required!' })
      .min(1, { message: 'Password is required!' }),
  });

export type LoginSchema = z.infer<typeof loginSchema>;
