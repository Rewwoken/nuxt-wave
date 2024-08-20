import { z } from 'zod';

export const createRepostSchema = createPostSchema.extend({
	postId: z.string(),
	text: createPostSchema.shape.text.optional(),
});

export type CreateRepostSchema = z.infer<typeof createRepostSchema>;
