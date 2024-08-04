import { z } from 'zod';

export const codeSchema = z
	.object({
		id: z.string(),
		code: z.string().length(36), // crypto.randomUUID length
	});

export type CodeSchema = z.infer<typeof codeSchema>;
