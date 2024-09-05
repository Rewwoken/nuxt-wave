import { z } from 'zod';

export const recoverySchema = registerSchema
	.pick({ password: true })
	.extend({
		confirmPassword: z.string(),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: 'Passwords should match!',
		path: ['confirmPassword'],
	});

export type RecoverySchema = z.infer<typeof recoverySchema>;
