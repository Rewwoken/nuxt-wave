export default () => {
	async function login(body: any) {
		try {
			await $fetch('/api/auth/login', {
				method: 'POST',
				body,
			});

			await navigateTo('/home');
		}
		catch (error) {
			// TODO: handle error
		}
	}

	async function register(body: any) {
		try {
			await $fetch('/api/auth/register', {
				method: 'POST',
				body,
			});
		}
		catch (error) {
			// TODO: handle error
		}
	}

	return { login, register };
};
