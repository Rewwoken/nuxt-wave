export function useLogout() {
	const { $api } = useNuxtApp();

	async function logout() {
		await $api('/api/auth/logout', {
			method: 'POST',
		});

		await navigateTo('/auth');
	}

	return { logout };
}
