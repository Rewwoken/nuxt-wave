import { z } from 'zod';
import { countPostsByUserId } from '~/server/database/post';

export default defineEventHandler(async (event) => {
	const query = await getValidatedQuery(event, z.object({
		userId: z.string(),
	}).parse);

	return countPostsByUserId(query.userId);
});
