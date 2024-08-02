export default defineNuxtRouteMiddleware((to) => {
	const refreshToken = useCookie('refreshToken');

	// Redirect authenticated user from /auth
	if (to.path === '/auth' && refreshToken.value) {
		return navigateTo('/home');
	}
});
