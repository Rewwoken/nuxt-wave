import { z } from 'zod';
import { createPostSchema } from '~/schemas/post/create-post';

export const createRepostSchema = createPostSchema.extend({
	postId: z.string(),
	text: createPostSchema.shape.text.optional(),
});

export type CreateRepostSchema = z.infer<typeof createRepostSchema>;
