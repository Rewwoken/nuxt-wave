import { z } from 'zod';
import { createPost } from '~/server/database/post/crud/create';
import { findRootPostIdById } from '~/server/database/post/crud/read';

const schema = z.object({
	parentId: z.string().optional(),
});

export default defineEventHandler({
	onRequest: [auth],
	handler: async (event) => {
		// Validate the query parameters
		const queryParse = await getValidatedQuery(event, schema.safeParse);
		if (!queryParse.success) {
			throw serverError(400, 'invalid-query');
		}

		// Get the form data
		const { fields, files } = await parseForm(event.node.req);
		const text = fields.text?.join('');

		// Validate the text
		const textParse = postTextSchema.safeParse(text);
		if (!textParse.success) {
			throw serverError(400, 'invalid-text');
		}

		// Validate the files
		const validatedFiles = validateMediaFiles(files);
		const userId = getCurrentUser(event, 'id');

		// Get the parent post ID
		const parentId = queryParse.data.parentId;
		if (!parentId) {
			// Create a new post without a parent
			return createPost(userId, null, null, textParse.data, validatedFiles);
		}

		// Find and validate the root post ID of the parent post
		const rootId = await findRootPostIdById(parentId);
		if (!rootId) {
			throw serverError(404, 'parent-not-found');
		}

		// Create a new post with a parent
		return createPost(userId, rootId, parentId, textParse.data, validatedFiles);
	},
});
