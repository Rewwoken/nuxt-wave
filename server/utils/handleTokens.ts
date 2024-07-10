import type { H3Event } from 'h3';
import logoutPost from '~/server/api/auth/logout.post';

export async function handleInvalidAccessToken(event: H3Event, cookies: Record<string, string>) {
	const isRefreshValid = verifyToken(cookies.refreshToken);

	if (!isRefreshValid) {
		await logoutPost(event);

		return sendRedirect(event, '/auth');
	}

	const { id } = decodeToken(cookies.refreshToken);
	const { accessToken, refreshToken } = issueTokens(id);

	setAccessToken(event, accessToken);
	setRefreshToken(event, refreshToken);

	event.context.userId = id;
}

export async function handleValidAccessToken(event: H3Event, cookies: Record<string, string>) {
	const { id } = decodeToken(cookies.accessToken);
	const { accessToken, refreshToken } = issueTokens(id);

	setAccessToken(event, accessToken);
	setRefreshToken(event, refreshToken);

	event.context.userId = id;
}
