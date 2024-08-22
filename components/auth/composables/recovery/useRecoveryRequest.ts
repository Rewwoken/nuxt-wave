export function useRecoveryRequest(id: unknown, code: unknown) {
	const { $api } = useNuxtApp();

	const { handleRequest, serverError } = useHandleRequest();
	const { showSuccess } = useNotification();

	const submitRecovery = async (values: RecoverySchema) => {
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
				'error/expried': 'Recovery code expired!',
				'error/unknown': 'Error recovering the password!',
			},
		});
	};

	return {
		submitRecovery,
		serverError,
	};
}
