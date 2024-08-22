import { z } from 'zod';

export const postTextSchema = z
	.string({ message: 'Must be a string!' })
	.max(280, { message: 'Must be less than 280 characters!' });

export type PostTextSchema = z.infer<typeof postTextSchema>;

export const createPostSchema = z
	.object({
		text: postTextSchema,
	});

export type CreatePostSchema = z.infer<typeof createPostSchema>;
