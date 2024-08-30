import { updateProfile } from '~/server/database/profile/crud/update';

export default defineEventHandler({
	onRequest: [auth],
	handler: async (event) => {
		const { fields, files } = await parseForm(event.node.req);
		const joinedFields = joinFormFields(fields);

		const { success, data: text, error } = updateProfileSchema.safeParse(joinedFields);
		if (!success) {
			const errors = error.flatten().fieldErrors;
			throw serverError(400, 'invalid-fields', errors);
		}

		const { imageFilepath, bannerFilepath } = validateProfileFiles(files);

		const userId = getCurrentUser(event, 'id');
		try {
			return await updateProfile(userId, text, imageFilepath, bannerFilepath);
		}
		catch {
			throw serverError();
		}
	},
});
