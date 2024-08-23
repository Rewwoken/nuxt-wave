import type { FetchedPost } from '~/types/api.types';

export async function useProfilePosts(userId: string) {
	const { $api } = useNuxtApp();

	const posts = ref<FetchedPost[]>([]);
	const loadingMore = ref(true);

	async function loadMore() {
		loadingMore.value = true;
		const nextPosts = await $api(`/api/user/${userId}/posts`, {
			method: 'GET',
			query: {
				skip: posts.value.length,
				take: 5,
			},
			deep: false,
		});
		loadingMore.value = false;

		posts.value.push(...nextPosts);
	}

	return { posts, loadMore, loadingMore };
}
