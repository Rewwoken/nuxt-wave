import type { RegisterSchema } from '~/schemas/register';

export default () => {
	const isPending = ref(false);

	async function login(body: any) {
		isPending.value = true;

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
		finally {
			isPending.value = false;
		}
	}

	async function register(body: RegisterSchema) {
		isPending.value = true;

		try {
			await $fetch('/api/auth/register', {
				method: 'POST',
				body,
			});
		}
		catch (error) {
			// TODO: handle error
		}
		finally {
			isPending.value = false;
		}
	}

	return { login, register, isPending };
};
