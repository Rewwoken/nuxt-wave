// ? TODO: client cache
// ? TODO: reusable composable for posts and threads
import type { Post } from '~/types/api.types';

export async function useProfilePosts(userId: string) {
	const posts = ref<Post[]>([]);
	const { count: page, inc: nextPage } = useCounter(0);

	const { $api } = useNuxtApp();
	async function loadMore() {
		const moreData = await $api(`/api/user/${userId}/posts`, {
			method: 'GET',
			query: { page: page.value },
			// cache: 'no-store',
		});

		posts.value.push(...moreData);
		nextPage();
	}

	return { posts, loadMore };
}
