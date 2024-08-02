import type { User } from '~/types/api.types';

export default () => {
	const currentUser = useState<User>('current-user');

	// Called once in ~/layouts/default.vue
	async function fetchCurrentUser() {
		const { $api } = useNuxtApp();
		currentUser.value = await $api<User>('/api/me');
	}

	return {
		currentUser: currentUser.value,
		fetchCurrentUser,
	};
};
