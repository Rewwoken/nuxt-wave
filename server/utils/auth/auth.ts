import type { H3Event } from 'h3';
import { findUniqueUser } from '~/server/database/user/crud/read';

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

	const user = await findUniqueUser({ id });
	if (!user) {
		throw createError({
			statusCode: 401,
			statusMessage: 'Unauthorized',
			message: 'User does not exist!',
		});
	}

	event.context.user = user;
}
