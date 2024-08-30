export function useProfileThreadsCount(userId: string) {
	return useAPI(`/api/user/${userId}/threads/count`, {
		method: 'GET',
		dedupe: 'defer',
	});
}
