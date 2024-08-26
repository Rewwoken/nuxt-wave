import type { H3Event } from 'h3';

type ContextUser = NonNullable<H3Event['context']['user']>;
type UserKey = keyof ContextUser;

/**
 * @overload
 * @param event - The event object containing the context.
 * @returns The entire user object if no key is provided, otherwise the value of the specified key.
 *
 * @throws Throws an error if the user is not authenticated.
 * @note This function assumes that the authentication middleware has been executed and the user object is present in the event context.
 */
export function getCurrentUser(event: H3Event): ContextUser;

/**
 * @overload
 * @param event - The event object containing the context.
 * @param key - The specific key of the user object to retrieve.
 * @returns The specified key of the user object.
 *
 * @throws Throws an error if the user is not authenticated.
 * @note This function assumes that the authentication middleware has been executed and the user object is present in the event context.
 */
export function getCurrentUser<KeyT extends UserKey>(event: H3Event, key: KeyT): ContextUser[KeyT];

/**
 * Retrieves the current user object or a specific property from the event context.
 *
 * @param event - The event object containing the context.
 * @param key - The specific key of the user object to retrieve.
 * @returns The entire user object if no key is provided, otherwise the value of the specified key.
 *
 * @throws Throws an error if the user is not authenticated.
 * @note This function assumes that the authentication middleware has been executed and the user object is present in the event context.
 */
export function getCurrentUser(event: H3Event, key?: UserKey) {
	const user = event.context.user;

	if (!user) {
		throw serverError(500, 'no-authenticated-user');
	}

	return key ? user[key] : user;
}
