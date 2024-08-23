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
		throw serverError(401, 'ivalid-refresh');
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
		throw serverError(401, 'ivalid-user');
	}

	event.context.user = user;
}
