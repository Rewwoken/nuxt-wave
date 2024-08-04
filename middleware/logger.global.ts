/* eslint-disable no-console */

export default defineNuxtRouteMiddleware((to) => {
	console.log(`[NUXT] PAGE ${to.fullPath}`);
});
