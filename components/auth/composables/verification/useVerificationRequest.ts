export function useVerificationRequest() {
	const { $api } = useNuxtApp();

	const { handleRequest } = useHandleRequest();
	const { showSuccess, showError } = useNotification();

	const verify = async (id: string, code: string) => {
		await handleRequest({
			requestFunc: () => $api('/api/auth/verification', {
				method: 'GET',
				query: { id, code },
			}),
			onSuccess: () => {
				showSuccess('Email verified, you can log in now.');
			},
			errors: {
				'error/not-found': 'User not found.',
				'error/expired': 'Verification link expired. Please, try again later.',
				'error/unknown': 'Unexpected error. Please, try again later.',
			},
			onError: (message) => {
				showError(message);
			},
			finallyFunc: async () => {
				await navigateTo('/auth');
			},
		});
	};

	return { verify };
};
