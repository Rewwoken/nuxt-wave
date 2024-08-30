export function useLoginRequest() {
	const { $api } = useNuxtApp();

	const { handleRequest, serverError } = useHandleRequest();
	const { showInfo } = useNotification();

	const submitLogin = async (values: LoginSchema) => {
		await handleRequest({
			requestFunc: () => $api('/api/auth/login', {
				method: 'POST',
				body: values,
			}),
			onSuccess: async () => {
				await navigateTo('/home', { replace: true });
				showInfo(`You logged in as @${values.username}.`);
			},
			errors: {
				'error/credentials': 'Invalid credentials!',
				'error/not-verified': 'Email is not verified!',
				'error/invalid-body': 'Invalid data!',
				'error/unknown': 'Unexpected error!',
			},
		});
	};

	return {
		submitLogin,
		serverError,
	};
}
