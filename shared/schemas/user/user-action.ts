import { z } from 'zod';

export const userActionSchema = z.object({
	id: z.string(),
	action: z.enum(['follow', 'block']),
});

export type UserActionSchema = z.infer<typeof userActionSchema>;
