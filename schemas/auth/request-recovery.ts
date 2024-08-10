import { z } from 'zod';

export const requestRecoverySchema = z
	.object({
		email: z
			.string({ message: 'Email is required' })
			.email({ message: 'Must be a valid email!' }),
	});

export type RequestRecoverySchema = z.infer<typeof requestRecoverySchema>;
