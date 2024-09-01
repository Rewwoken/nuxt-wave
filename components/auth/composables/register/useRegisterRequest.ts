export function useRegisterRequest() {
	const { $api } = useNuxtApp();

	const { handleRequest, serverError } = useHandleRequest();
	const { showSuccess } = useNotification();

	const submitRegister = async (values: RegisterSchema, onSuccess: () => void) => {
		await handleRequest({
			requestFunc: () => $api('/api/auth/register', {
				method: 'POST',
				body: values,
			}),
			onSuccess: async () => {
				onSuccess();
				// For now the server still sends email verification
				// but later it should became optional
				showSuccess('User have been successfully registered.');
			},
			errors: {
				'error/user-exists': 'User already exists!',
				'error/not-expired': 'Previous code has not expired!',
				'error/invalid-body': 'Invalid data!',
				'error/unknown': 'Unexpected error!',
			},
		});
	};

	return {
		submitRegister,
		serverError,
	};
}
