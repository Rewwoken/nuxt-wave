import type { H3Event } from 'h3';
import { findUserById } from '~/server/database/user';

export default defineEventHandler(async (event) => {
	const authorizationHeader = getRequestHeader(event, 'authorization');
	const accessToken = authorizationHeader?.split(' ')[1];

	const isAccessValid = verifyToken(accessToken);
	if (isAccessValid) {
		await handleVerifiedToken(event, accessToken!);

		return void 0;
	}

	const cookies = parseCookies(event);
	const isRefreshValid = verifyToken(cookies.refreshToken);
	if (!isRefreshValid) {
		throw createError({
			statusCode: 401,
			statusMessage: 'Unauthorized',
			message: 'Invalid refresh token!',
		});
	}

	const { id } = decodeToken(cookies.refreshToken);
	const newAccessToken = issueAccessToken(id);

	setAccessToken(event, newAccessToken);
	await handleVerifiedToken(event, newAccessToken);
});

async function handleVerifiedToken(event: H3Event, value: string) {
	const { id } = decodeToken(value);

	const user = await findUserById(id);
	if (!user) {
		throw createError({
			statusCode: 401,
			statusMessage: 'Unauthorized',
			message: 'User does not exist!',
		});
	}

	// @ts-expect-error | ...
	event.context.user = user;
}
