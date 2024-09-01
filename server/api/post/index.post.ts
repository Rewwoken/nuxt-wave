import { z } from 'zod';
import { createPost } from '~/server/database/post/crud/create';
import { findPostWithRootById } from '~/server/database/post/crud/read';

const ALLOWED_MIMES = ['image/png', 'image/jpeg', 'image/gif', 'image/jpg', 'video/mp4'];
const MAX_FILE_SIZE = 15_728_640; // 15mb

const schema = z.object({
	parentId: z.string().optional(),
});

export default defineEventHandler({
	onRequest: [auth],
	handler: async (event) => {
		const { success: querySuccess, data: query } = await getValidatedQuery(event, schema.safeParse);
		if (!querySuccess) {
			throw serverError(400, 'invalid-query');
		}

		const formParse = await parseForm(event.node.req);
		const joinedText = formParse.fields.text ? joinFormField(formParse.fields.text) : ''; // TODO: handle \n

		const { success: textSuccess, data: text } = postTextSchema.safeParse(joinedText);
		if (!textSuccess) {
			throw serverError(400, 'invalid-text');
		}

		const files = validateFormFiles(formParse.files, ALLOWED_MIMES, MAX_FILE_SIZE);
		const userId = getCurrentUser(event, 'id');

		const parentId = query.parentId;
		if (!parentId) {
			return createPost({ userId, text, files });
		}

		const parentPost = await findPostWithRootById(parentId);
		if (!parentPost) {
			throw serverError(404, 'parent-not-found');
		}

		// Determine the root post ID:
		// If the parent post has a root post, use that root post's ID.
		// Otherwise, the parent post itself is the root, so use the parent's ID.
		const rootId = parentPost?.rootPost?.id ?? parentId;

		return createPost({ userId, rootId, parentId, text, files });
	},
});
