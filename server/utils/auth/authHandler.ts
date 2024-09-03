import type { EventHandler, EventHandlerRequest, H3Event } from 'h3';
import { findUniqueUser } from '~/server/database/user/crud/read';

// TODO: keep refreshToken in database
export const authHandler = defineEventHandler(async (event) => {
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
		throw serverError(401, 'invalid-refresh');
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
		throw serverError(401, 'invalid-user');
	}

	event.context.user = user;
}

/**
 * A shortcut for `defineEventHandler` using `authHandler` on request.
 *
 * @param handler - The event handler to be wrapped with authentication.
 * @returns The event handler wrapped with authentication.
 */
export function defineAuthEventHandler<ResT>(handler: EventHandler<EventHandlerRequest, ResT>) {
	return defineEventHandler({
		onRequest: [authHandler],
		handler,
	});
}
