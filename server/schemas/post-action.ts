import { z } from 'zod';

export const postActionSchema = z.object({
	id: z.string(),
	action: z.enum(['like', 'bookmark']),
});

export type PostActionSchema = z.infer<typeof postActionSchema>;
