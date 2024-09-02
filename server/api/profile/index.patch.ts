import { updateProfile } from '~/server/database/profile/crud/update';

export default defineAuthEventHandler(async (event) => {
	const { fields, files } = await parseForm(event.node.req);
	const joinedFields = joinFormFields(fields);

	const { success, data: text, error } = updateProfileSchema.safeParse(joinedFields);
	if (!success) {
		const errors = error.flatten().fieldErrors;
		throw serverError(400, 'invalid-fields', errors);
	}

	const { imageFilepath, bannerFilepath } = validateProfileFiles(files);

	const userId = authUser(event, 'id');
	try {
		return await updateProfile(userId, text, imageFilepath, bannerFilepath);
	}
	catch (err) {
		console.error('Error updating profile:', err);
		throw serverError();
	}
});
