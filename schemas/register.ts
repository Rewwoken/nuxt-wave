import { z } from 'zod';

export const isUsername = /^[a-z0-9_.]+$/;

export const registerSchema = z.object({
  name: z
    .string({ message: 'Name is required!' })
    .min(3, { message: 'Must be at least 3 characters!' })
    .max(30, { message: 'Must be less than 30 characters!' }),
  username: z
    .string({ message: 'Username is required!' })
    .min(3, { message: 'Must be at least 3 characters!' })
    .max(15, { message: 'Must be less than 15 characters!' })
    .regex(isUsername, { message: 'Invalid characters!' }),
  password: z
    .string({ message: 'Password is required!' })
    .min(6, { message: 'Must be at least 6 characters!' })
    .max(35, { message: 'Must be less than 35 characters!' }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
