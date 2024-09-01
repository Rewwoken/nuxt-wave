// ? TODO: client cache
// ? TODO: reusable composable for posts and threads
import type { Thread } from '~/types/api.types';

export async function useProfileThreads(userId: string) {
	const threads = ref<Thread[]>([]);
	const { count: page, inc: nextPage } = useCounter(0);

	const { $api } = useNuxtApp();
	async function loadMore() {
		const moreData = await $api(`/api/user/${userId}/threads`, {
			method: 'GET',
			params: { page: page.value },
		});

		threads.value.push(...moreData);
		nextPage();
	}

	return { threads, loadMore };
}
