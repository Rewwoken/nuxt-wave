export function usePostBookmark(id: string, status: boolean) {
	const isBookmarked = ref(status);

	const { $api } = useNuxtApp();
	async function toggleBookmark() {
		const method = isBookmarked.value ? 'DELETE' : 'POST';

		await $api(`/api/post/bookmark/${id}`, {
			method,
		});

		isBookmarked.value = !isBookmarked.value;
	}

	return { isBookmarked, toggleBookmark };
}
