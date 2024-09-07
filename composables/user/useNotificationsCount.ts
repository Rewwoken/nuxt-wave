export function useNotificationsCount() {
	const { data: count } = useAPI('/api/notifications/count', {
		method: 'GET',
		dedupe: 'defer',
	});

	useSeoMeta({
		titleTemplate: (titleChunk) => {
			const title = count.value ? `(${count.value}) ${titleChunk}` : titleChunk;

			return `${title} / Wave`;
		},
	});

	return { count };
}
