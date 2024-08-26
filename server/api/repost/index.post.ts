import { createRepost } from '~/server/database/repost/crud/create';

export default defineEventHandler({
	onRequest: [auth],
	handler: async (event) => {
		const body = await readValidatedBody(event, createRepostSchema.parse);

		const userId = getCurrentUser(event, 'id');
		return createRepost(userId, body.postId, body.text);
	},
});
