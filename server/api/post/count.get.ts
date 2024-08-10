import { z } from 'zod';
import { countPostsByUserId } from '~/server/database/post/analytics/count';

const schema = z.object({
	userId: z.string(),
});

export default defineEventHandler(async (event) => {
	const query = await getValidatedQuery(event, schema.parse);

	return countPostsByUserId(query.userId);
});
