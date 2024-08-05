export async function logout() {
	await $fetch('/api/auth/logout', {
		method: 'POST',
	});

	await navigateTo('/auth');
}
