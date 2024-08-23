export function useProfileEditRequest() {
	const { $api } = useNuxtApp();

	const { handleRequest } = useHandleRequest();
	const { showSuccess, showError } = useNotification();

	const submitProfileEdit = async (image: File | undefined, banner: File | undefined, values: UpdateProfileSchema) => {
		const formData = new FormData();

		for (const [key, value] of Object.entries(values)) {
			if (value !== undefined) {
				formData.set(key, value);
			}
		}

		if (image) {
			formData.set('image', image);
		}
		if (banner) {
			formData.set('banner', banner);
		}

		await handleRequest({
			requestFunc: () => $api('/api/profile', {
				method: 'PATCH',
				body: formData,
			}),
			onSuccess: () => {
				showSuccess('Profile has been successfully changed!');

				// ? TODO: add loader toast
			},
			errors: {
				'error/fields': 'Invalid fields.',
				'error/unknown': 'Unexpected error, please try again later.',
			},
			onError: (message) => {
				showError(message);
			},
		});
	};

	return { submitProfileEdit };
}
