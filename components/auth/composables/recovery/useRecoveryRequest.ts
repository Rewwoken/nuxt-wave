export function useRecoveryRequest() {
	const { $api } = useNuxtApp();

	const { handleRequest, serverError } = useHandleRequest();
	const { showSuccess } = useNotification();

	const submitRecovery = async (values: RecoverySchema, id: unknown, code: unknown) => {
		await handleRequest({
			requestFunc: () => $api('/api/auth/recovery', {
				method: 'POST',
				query: { id, code },
				body: values,
			}),
			onSuccess: async () => {
				showSuccess('You can now log in with a new password.');
				await navigateTo('/auth');
			},
			errors: {
				'error/expired': 'Recovery code expired!',
				'error/invalid-query': 'Invalid query!',
				'error/invalid-body': 'Invalid body!',
				'error/unknown': 'Error recovering the password!',
			},
		});
	};

	return {
		submitRecovery,
		serverError,
	};
}
