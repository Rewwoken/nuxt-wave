export function usePostLike(id: string, status: boolean, count: number) {
	const isLiked = ref(status);
	const likesCount = ref(count);

	const { $api } = useNuxtApp();
	async function toggleLike() {
		const method = isLiked.value ? 'DELETE' : 'POST';

		await $api(`/api/post/${id}/like`, {
			method,
		});

		isLiked.value = !isLiked.value;
		likesCount.value += isLiked.value ? 1 : -1;
	}

	return { isLiked, toggleLike, likesCount };
}
