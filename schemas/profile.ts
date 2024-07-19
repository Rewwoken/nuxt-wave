import { z } from 'zod';

export const profileSchema = z.object({
  name: z
    .string({ message: 'Name is required!' })
    .min(3, { message: 'Must be at least 3 characters!' })
    .max(30, { message: 'Must be less than 30 characters!' }),
  // bio: z
  //   .string({ message: 'Username is required!' })
  //   .min(3, { message: 'Must be at least 3 characters!' })
  //   .max(15, { message: 'Must be less than 15 characters!' })
  //   .regex(isUsername, { message: 'Invalid characters!' }),
  // location: z
  //   .string({ message: 'Password is required!' })
  //   .min(6, { message: 'Must be at least 6 characters!' })
  //   .max(35, { message: 'Must be less than 35 characters!' }),
  // website: z
  //   .string({ message: 'Password is required!' })
  //   .min(6, { message: 'Must be at least 6 characters!' })
  //   .max(35, { message: 'Must be less than 35 characters!' }),
});

export type ProfileSchema = z.infer<typeof profileSchema>;
