import { updateProfile } from '~/server/database/profile/crud/update';
import {
	PROFILE_BANNER_ALLOWED_MIMES,
	PROFILE_BANNER_MAX_SIZE,
	PROFILE_IMAGE_ALLOWED_MIMES,
	PROFILE_IMAGE_MAX_SIZE,
} from '~/shared/profile/constants';

export default defineAuthEventHandler(async (event) => {
	const { fields, files } = await parseForm(event.node.req);
	const joinedFields = joinFormFields(fields);

	const { success: successText, data: text, error } = updateProfileSchema.safeParse(joinedFields);
	if (!successText) {
		const errors = error.flatten().fieldErrors;
		throw serverError(400, 'invalid-fields', errors);
	}

	const media: { image?: string; banner?: string } = {};

	if (files.image) {
		const { filepath } = validateFormFile(files.image[0], PROFILE_IMAGE_ALLOWED_MIMES, PROFILE_IMAGE_MAX_SIZE);
		media.image = filepath;
	}

	if (files.banner) {
		const { filepath } = validateFormFile(files.banner[0], PROFILE_BANNER_ALLOWED_MIMES, PROFILE_BANNER_MAX_SIZE);
		media.banner = filepath;
	}

	const userId = authUser(event, 'id');
	try {
		return await updateProfile(userId, text, media.image, media.banner);
	}
	catch (err) {
		console.error('Error updating profile:', err);
		throw serverError();
	}
});
