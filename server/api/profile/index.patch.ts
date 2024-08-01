import type formidable from 'formidable';
import { profileSchema } from '~/schemas/profile';
import { updateProfile } from '~/server/database/profile';

export default defineEventHandler(async (event) => {
	const formParse = await parseForm(event.node.req);

	const fields = formatFields(formParse.fields);

	const schemaParse = profileSchema.safeParse(fields);
  if (!schemaParse.success) {
    const errors = schemaParse.error.flatten().fieldErrors;

    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'error/invalid-fields',
      data: errors,
    });
	}

	const { image, banner } = validateProfileFiles(formParse.files.image?.[0], formParse.files.banner?.[0]);

	const userId = event.context.userId;
	try {
		await updateProfile(userId, schemaParse.data, image, banner);
	}
	catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Bad Request',
      message: 'error/unknown',
    });
	}
});

function formatFields(fields: formidable.Fields<string>) {
	const formattedFields: Record<string, string> = {};

  const fieldsEntries = Object.entries(fields);
  for (const [name, field] of fieldsEntries) {
    formattedFields[name] = field!.join(' ');
	}

	return formattedFields;
}
