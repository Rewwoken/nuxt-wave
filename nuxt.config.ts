/* eslint-disable node/prefer-global/process */
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
	compatibilityDate: '2024-07-04',
	css: ['primeicons/primeicons.css'],
	runtimeConfig: {
		jwtSecret: process.env.JWT_SECRET,
	},
	build: {
		transpile: ['primevue'],
	},
	alias: {
		'@/*': './src/*',
	},
});
