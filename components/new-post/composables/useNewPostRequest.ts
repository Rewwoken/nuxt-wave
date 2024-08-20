import type { MediaItem } from '~/types/new-post.types';

interface UseNewPostFormParams {
	parentId?: string;
	items: Ref<MediaItem[]>;
	onSuccess: () => void;
}
export function useNewPostRequest({ parentId, items, onSuccess }: UseNewPostFormParams) {
	const { handleRequest } = useHandleRequest();

	const { $api } = useNuxtApp();
	const { showInfo, showError } = useNotification();

	const onNewPostSubmit = async (values: CreatePostSchema) => {
		const formData = new FormData();

		formData.append('text', values.text);
		items.value.forEach((item, index) => {
			formData.append(`media/${index + 1}`, item.file);
		});

		await handleRequest({
			requestFunc: () => $api('/api/post', {
				method: 'POST',
				body: formData,
				query: { parentId },
			}),
			onSuccess: async () => {
				onSuccess();
				showInfo('Post has been successfully created.');
			},
			errors: {
				'error/size': 'File size is too much! Allow for a maximum of 15 MB.',
				'error/invalid-type': 'Invalid file type!',
				'error/unknown': 'Unexpected error!',
			},
			onError: (message) => {
				showError(message);
			},
		});
	};

	return { onNewPostSubmit };
}
