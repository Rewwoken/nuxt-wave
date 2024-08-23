import type { FetchedUser } from '~/types/api.types';

/**
 * Returns the current user data, memoized with useState
 * to prevent duplicate requests when used on the client side.
 *
 * @return The current user data.
 */
export function useCurrentUser() {
	// Current user data is fetched in ~/layouts/default.vue
	const data = useState<FetchedUser>('current-user');

	if (!data) {
		throw new Error('Current user data is not available');
	}

	return data;
}
