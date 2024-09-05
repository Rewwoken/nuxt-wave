import { POST_MAX_FILES_QUANTITY } from '~/shared/post/constants';

export function useNewPostRequest() {
	const { $api } = useNuxtApp();

	const { handleRequest } = useHandleRequest();
	const { showSuccess, showError } = useNotification();

	const submitNewPost = async (
		values: CreatePostSchema,
		files: MaybeRefOrGetter<File[]>,
		parentId: string | undefined,
		onSuccess: () => void,
	) => {
		const formData = new FormData();

		formData.append('text', values.text);

		const items = toValue(files);
		items.forEach((item, index) => {
			formData.append(`media/${index + 1}`, item);
		});

		await handleRequest({
			requestFunc: () => $api('/api/post', {
				method: 'POST',
				body: formData,
				query: { parentId },
			}),
			onSuccess: async () => {
				onSuccess();
				showSuccess('Post has been successfully created.');
			},
			errors: {
				'error/too-many-files': `Too many files! Maximum is ${POST_MAX_FILES_QUANTITY}.`,
				'error/file-too-big': 'File size is too big!',
				'error/invalid-type': 'Invalid file type!',
				'error/unknown': 'Unexpected error!',
			},
			onError: (message) => {
				showError(message);
			},
		});
	};

	return { submitNewPost };
}
