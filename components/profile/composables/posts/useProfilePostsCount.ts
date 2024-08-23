export function useProfilePostsCount(userId: string) {
	return useAPI(`/api/user/${userId}/posts/count`, {
		method: 'GET',
		dedupe: 'defer',
	});
}
