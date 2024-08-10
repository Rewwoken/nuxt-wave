import { createRepostSchema } from '~/schemas/post/create-repost';
import { createRepost } from '~/server/database/repost/crud/create';

export default defineEventHandler({
	onRequest: [auth],
	handler: async (event) => {
		const body = await readValidatedBody(event, createRepostSchema.parse);

		const userId = event.context.user.id;
		return createRepost(userId, body.postId, body.text);
	},
});
