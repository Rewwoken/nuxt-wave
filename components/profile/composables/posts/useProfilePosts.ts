import type { Post } from '~/types/api.types';

const POSTS_COUNT = 5;

export async function useProfilePosts(userId: string) {
	const posts = ref<Post[]>([]);

	const { $api } = useNuxtApp();
	async function loadMore() {
		// const shouldCache = posts.value.length < (POSTS_COUNT * 2);

		const moreData = await $api(`/api/user/${userId}/posts`, {
			method: 'GET',
			params: { skip: posts.value.length, take: POSTS_COUNT },
			// cache: shouldCache ? 'force-cache' : 'default',
		});

		posts.value.push(...moreData);
	}

	return {
		posts,
		loadMore,
	};
}
