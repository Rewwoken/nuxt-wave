import argon2 from 'argon2';
import { createRefreshToken } from '~/server/database/refreshToken';
import { findUser } from '~/server/database/user';
import { issueTokens } from '~/server/utils/issueTokens';
import { setRefreshToken } from '~/server/utils/setRefreshToken';

export default defineEventHandler(async (event) => {
	const body = await readBody(event);

	const user = await findUser(body.username);

	if (!user) {
		throw createError({
			statusCode: 400,
			message: 'User does not exist!',
		});
	}

	const valid = await argon2.verify(user.password, body.password);
	if (!valid) {
		throw createError({
			statusCode: 400,
			message: 'Password is invalid!',
		});
	}

	const { accessToken, refreshToken } = issueTokens(user.id);

	await createRefreshToken(user.id, refreshToken);
	setRefreshToken(event, refreshToken);

	const { password, ...data } = user;

	return { ...data, accessToken };
});
