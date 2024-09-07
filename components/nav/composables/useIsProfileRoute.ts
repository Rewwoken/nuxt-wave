export function useIsProfileRoute(username: string) {
	const route = useRoute();

	const isProfileRoute = computed(() => {
		const usernameRoute = `/${username}`;
		return route.path.startsWith(usernameRoute);
	});

	return { isProfileRoute };
}
