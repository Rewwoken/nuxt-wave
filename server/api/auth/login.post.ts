import { findUserByUsername } from '~/server/database/user/crud/read';

export default defineEventHandler(async (event) => {
	const { success: successBody, data: body } = await readValidatedBody(event, loginSchema.safeParse);
	if (!successBody) {
		throw serverError(400, 'invalid-body');
	}

	const user = await findUserByUsername(body.username);
	if (!user) {
		throw serverError(400, 'credentials');
	}

	const isValid = await verifyPassword(user.password, body.password);
	if (!isValid) {
		throw serverError(400, 'credentials');
	}

	const { accessToken, refreshToken } = issueTokens(user.id);
	setRefreshToken(event, refreshToken);
	setAccessToken(event, accessToken);

	return { id: user.id };
});
