import { z } from 'zod';
import { findPostById } from '~/server/database/post';

// TODO: specify select
export default defineEventHandler(async (event) => {
	const query = await getValidatedQuery(event, z.object({
		id: z.string(),
	}).parse);

	const post = await findPostById(query.id);
	if (!post) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: 'error/not-found',
		});
	}

	return post;
});
