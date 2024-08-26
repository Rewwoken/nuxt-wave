import type formidable from 'formidable';
import { updateProfile } from '~/server/database/profile/crud/update';

export default defineEventHandler({
	onRequest: [auth],
	handler: async (event) => {
		const { fields, files } = await parseForm(event.node.req);

		const formattedFields = formatFields(fields);

		const fieldsParse = updateProfileSchema.safeParse(formattedFields);
		if (!fieldsParse.success) {
			const errors = fieldsParse.error.flatten().fieldErrors;
			throw serverError(400, 'invalid-fields', errors);
		}

		const { image, banner } = validateProfileFiles(files.image?.[0], files.banner?.[0]);

		const userId = getCurrentUser(event, 'id');
		try {
			return await updateProfile(userId, fieldsParse.data, image, banner);
		}
		catch {
			throw serverError();
		}
	},
});

function formatFields(fields: formidable.Fields<string>) {
	const formattedFields: Record<string, string> = {};

	const fieldsEntries = Object.entries(fields);
	for (const [name, field] of fieldsEntries) {
		if (field === undefined) {
			continue;
		}

		formattedFields[name] = field.join(' ');
	}

	return formattedFields;
}
