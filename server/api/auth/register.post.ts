import { createUser } from '~/server/database/user/crud/create';
import { findUserByUsernameOrEmail } from '~/server/database/user/crud/read';

export default defineEventHandler(async (event) => {
	const { success: successBody, data: body } = await readValidatedBody(event, registerSchema.safeParse);
	if (!successBody) {
		throw serverError(400, 'invalid-body');
	}

	const existingUser = await findUserByUsernameOrEmail(body.username, body.email);
	if (existingUser) {
		throw serverError(400, 'user-exists');
	}

	setResponseStatus(event, 201);
	try {
		return await createUser(body);
	}
	catch (err) {
		console.error('Error creating user:', err);
		throw serverError();
	}
});
