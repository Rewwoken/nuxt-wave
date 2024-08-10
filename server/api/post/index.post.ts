import { z } from 'zod';
import { createPostSchema } from '~/schemas/post/create-post';
import { createPost } from '~/server/database/post/crud/create';

const schema = z.object({
	parentPostId: z.string().optional(),
});

export default defineEventHandler({
	onRequest: [auth],
	handler: async (event) => {
		const query = await getValidatedQuery(event, schema.parse);

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
			setResponseStatus(event, 201);
			return await createPost(userId, query.parentPostId, schemaParse.data.text, validatedFiles);
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
