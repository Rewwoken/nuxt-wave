import { z } from 'zod';

export const createPostSchema = z
	.object({
		text: z
			.string({ message: 'Text must be a string!' })
			.max(280, { message: 'Must be less than 280 characters!' }),
	});

export type CreatePostSchema = z.infer<typeof createPostSchema>;
