export default defineNuxtConfig({
	app: {
		head: {
			link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
		},
	},
	devtools: { enabled: true },
	devServer: {
		port: 8000,
	},
	modules: [
		'@nuxtjs/tailwindcss',
		'@primevue/nuxt-module',
		'@vee-validate/nuxt',
		'@nuxtjs/cloudinary',
		'@nuxt/image',
		'@nuxtjs/robots',
	],
  imports: {
		dirs: ['composables', 'composables/**'],
  },
	components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
	primevue: {
		importPT: { as: 'Wave', from: '~/presets/Wave' },
		options: {
			unstyled: true,
			ptOptions: {
				mergeProps: true,
			},
		},
	},
	compatibilityDate: '2024-08-02',
	css: ['~/assets/css/global.css', '~/assets/css/primevue.css', 'primeicons/primeicons.css'],
	runtimeConfig: {
		jwtSecret: process.env.JWT_SECRET,
		resendApiKey: process.env.RESEND_API_KEY,
		cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
		cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
		cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
		public: {
			baseUrl: process.env.BASE_URL,
		},
	},
	routeRules: {
		'/': {
			redirect: {
				to: '/home',
				statusCode: 301,
			},
		},
		'/auth': {
			ssr: false,
		},
		'/auth/recovery': {
			ssr: false,
		},
		'/auth/verification': {
			ssr: false,
		},
	},
	alias: {
		'@/*': './src/*',
	},
});
