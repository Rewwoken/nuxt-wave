import { z } from 'zod';
import { createPost } from '~/server/database/post/crud/create';
import { findPostWithRootIdById } from '~/server/database/post/crud/read';

const ALLOWED_MIMES = ['image/png', 'image/jpeg', 'image/gif', 'image/jpg', 'video/mp4'];
const MAX_FILE_SIZE = 15_728_640; // 15mb

const schema = z.object({
	parentId: z.string().optional(),
});

export default defineEventHandler({
	onRequest: [auth],
	handler: async (event) => {
		const queryParse = await getValidatedQuery(event, schema.safeParse);
		if (!queryParse.success) {
			throw serverError(400, 'invalid-query');
		}

		const { fields, files } = await parseForm(event.node.req);
		const text = fields.text ? joinFormField(fields.text) : '';

		const textParse = postTextSchema.safeParse(text);
		if (!textParse.success) {
			throw serverError(400, 'invalid-text');
		}

		const validatedFiles = validateFormFiles(files, ALLOWED_MIMES, MAX_FILE_SIZE);
		const userId = getCurrentUser(event, 'id');

		const parentId = queryParse.data.parentId;
		if (!parentId) {
			// If no parentId is provided, create a new root post (i.e., a post without a parent)
			// This will be the start of a new conversation thread
			return createPost(userId, null, null, textParse.data, validatedFiles);
		}

		const parentPost = await findPostWithRootIdById(parentId);
		if (!parentPost) {
			throw serverError(404, 'parent-not-found');
		}

		// Determine the root post ID:
		// If the parent post has a root post, use that root post's ID.
		// Otherwise, the parent post itself is the root, so use the parent's ID.
		const rootId = parentPost?.rootPost?.id ?? parentId;

		return createPost(userId, rootId, parentId, textParse.data, validatedFiles);
	},
});
