import { z } from 'zod';
import { findPostsByUserId } from '~/server/database/post/findPostsByUserId';

export default defineEventHandler(async (event) => {
	const query = await getValidatedQuery(event, z.object({
		userId: z.string(),
		skip: z.number().min(0),
		take: z.number().min(1).max(10),
	}).parse);

	setResponseStatus(event, 200);
	return findPostsByUserId(query.userId, {
		skip: query.skip,
		take: query.take,
	});
});
