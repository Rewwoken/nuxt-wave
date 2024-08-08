export default async () => {
	await $fetch('/api/auth/logout', {
		method: 'POST',
	});

	await navigateTo('/auth');
};
