// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
	compatibilityDate: '2024-07-04',
	css: ['primeicons/primeicons.css'],
	build: {
		transpile: ['primevue'],
	},
	alias: {
		"@/*": "./src/*"
	}
});
