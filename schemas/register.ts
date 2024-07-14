import { z } from 'zod';

export const registerSchema = z.object({
	name: z
		.string()
		.min(3, { message: 'Must be at least 3 characters!' })
		.max(30, { message: 'Must be less than 30 characters!' })
		.regex(/^[a-z0-9]+$/i, { message: 'Must only contain a-z, A-Z, 0-9!' }),
	username: z
		.string()
		.min(3, { message: 'Must be at least 3 characters!' })
		.max(15, { message: 'Must be less than 15 characters!' })
		.regex(/^[a-z0-9]+$/i, { message: 'Must only contain a-z, A-Z, 0-9!' }),
	password: z
		.string()
		.min(6, { message: 'Must be at least 6 characters!' })
		.max(35, { message: 'Must be less than 35 characters!' }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
