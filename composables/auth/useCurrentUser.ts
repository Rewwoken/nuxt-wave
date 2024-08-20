import type { User } from '~/types/api.types';

export function useCurrentUser() {
	// Current user data is fetched in ~/layouts/default.vue
	return useState<User>('current-user');
}
