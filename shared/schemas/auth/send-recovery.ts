import { z } from 'zod';

export const sendRecoverySchema = z
	.object({
		email: z
			.string({ message: 'Email is required' })
			.email({ message: 'Must be a valid email!' }),
	});

export type SendRecoverySchema = z.infer<typeof sendRecoverySchema>;
