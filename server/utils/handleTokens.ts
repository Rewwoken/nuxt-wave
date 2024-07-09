import type { H3Event } from 'h3';
import logoutPost from '~/server/api/auth/logout.post';

export async function handleInvalidAccess(event: H3Event, cookies: any) {
	const isRefreshValid = verifyToken(cookies.refreshToken);

	if (!isRefreshValid) {
		await logoutPost(event);

		return sendRedirect(event, '/auth');
	}

	const { id } = decodeToken(cookies.refreshToken);
	const { accessToken, refreshToken } = issueTokens(id);

	setAccessToken(event, accessToken);
	setRefreshToken(event, refreshToken);
}

export async function handleValidAccess(event: H3Event, cookies: any) {
	const { id } = decodeToken(cookies.accessToken);
	const { accessToken, refreshToken } = issueTokens(id);

	setAccessToken(event, accessToken);
	setRefreshToken(event, refreshToken);
}
