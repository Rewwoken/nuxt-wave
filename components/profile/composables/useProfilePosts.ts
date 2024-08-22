import type { FetchedPost } from '~/types/api.types';

export async function useProfilePosts(userId: string) {
	const { $api } = useNuxtApp();

	const posts = ref<FetchedPost[]>([]);
	const loadingMore = ref(true);

	async function loadMore() {
		loadingMore.value = true;
		const nextPosts = await $api('/api/post', {
			method: 'GET',
			query: { userId, skip: posts.value.length },
			deep: false,
		});
		loadingMore.value = false;

		posts.value.push(...nextPosts);
	}

	// onMounted(loadMore);

	return { posts, loadMore, loadingMore };
}
