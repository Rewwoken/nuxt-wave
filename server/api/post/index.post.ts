import { z } from 'zod';
import { createPostSchema } from '~/schemas/createPost';
import { createPost } from '~/server/database/post';

export default defineEventHandler({
	onRequest: [auth],
	handler: async (event) => {
		const query = await getValidatedQuery(event, z.object({
			parentPostId: z.string().optional(),
		}).parse);

		const formParse = await parseForm(event.node.req);

		const schemaParse = createPostSchema.safeParse({
			text: formParse.fields.text?.join(''),
		});
		if (!schemaParse.success) {
			throw createError({
				statusCode: 400,
				statusMessage: 'Bad Request',
				message: 'error/text',
			});
		}

		const validatedFiles = validateMediaFiles(formParse.files);

		const userId = event.context.user.id;
		try {
			event.node.res.statusCode = 201;
			await createPost(userId, query.parentPostId, schemaParse.data.text, validatedFiles);
		}
		catch {
			throw createError({
				statusCode: 500,
				statusMessage: 'Internal Server Error',
				message: 'error/unknown',
			});
		}
	},
});
