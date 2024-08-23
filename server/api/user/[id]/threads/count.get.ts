import { z } from 'zod';
import { countThreadsByUserId } from '~/server/database/post/analytics/count';

const paramsSchema = z.object({
	id: z.string(),
});

export default defineEventHandler(async (event) => {
	const params = await getValidatedRouterParams(event, paramsSchema.parse);

	return countThreadsByUserId(params.id);
});
