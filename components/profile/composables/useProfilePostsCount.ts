export function useProfilePostsCount(userId: string) {
	return useAPI('/api/post/count', {
		method: 'GET',
		query: { userId },
		dedupe: 'defer',
	});
}
