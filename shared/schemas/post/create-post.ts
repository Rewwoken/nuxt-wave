import { z } from 'zod';
import { POST_TEXT_MAX_LENGTH } from '~/shared/post/constants';

export const postTextSchema = z
	.string({ message: 'Must be a string!' })
	.max(POST_TEXT_MAX_LENGTH, { message: `Must be less than ${POST_TEXT_MAX_LENGTH} characters!` });

export type PostTextSchema = z.infer<typeof postTextSchema>;

export const createPostSchema = z
	.object({
		text: postTextSchema,
	});

export type CreatePostSchema = z.infer<typeof createPostSchema>;
