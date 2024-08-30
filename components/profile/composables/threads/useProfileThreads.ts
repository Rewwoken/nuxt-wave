import type { Thread } from '~/types/api.types';

const THREADS_COUNT = 3;

export async function useProfileThreads(userId: string) {
	const threads = ref<Thread[]>([]);

	const { $api } = useNuxtApp();
	async function loadMore() {
		// const shouldCache = threads.value.length < (THREADS_COUNT * 2);

		const moreData = await $api(`/api/user/${userId}/threads`, {
			method: 'GET',
			params: { skip: threads.value.length, take: THREADS_COUNT },
			// cache: shouldCache ? 'force-cache' : 'default',
		});

		threads.value.push(...moreData);
	}

	return {
		threads,
		loadMore,
	};
}
