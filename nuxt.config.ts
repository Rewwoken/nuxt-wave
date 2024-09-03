export default defineNuxtConfig({
	// Basic configuration
	compatibilityDate: '2024-08-02',
	devtools: { enabled: true },
	devServer: { port: 8000 },

	// App and global settings
	app: {
		head: {
			htmlAttrs: { lang: 'en' },
			link: [
				{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
				{ rel: 'canonical', href: `${process.env.BASE_URL}/home` },
			],
		},
	},

	// Global CSS files
	css: [
		'~/assets/css/global.css', // Global styles
		'~/assets/css/primevue.css', // PrimeVue variables
		'primeicons/primeicons.css', // PrimeVue icons
	],

	// Modules and plugins
	modules: [
		'@vueuse/nuxt',
		'@nuxtjs/tailwindcss',
		'@primevue/nuxt-module',
		'@vee-validate/nuxt',
		'@nuxtjs/cloudinary',
		'@nuxt/image',
		'@nuxtjs/robots',
	],

	// Auto-imports and components
	imports: {
		autoImport: true,
		dirs: [
			'composables/**', // Global composables
			'components/*/composables/**', // Component-scoped services
			'schemas/**', // Zod schemas (shared between server and client)
		],
	},

	// * Nitro auto-imports
	nitro: {
		imports: {
			dirs: ['schemas/**'], // Zod schemas (shared between server and client)
		},
	},

	// Auto-registration of components from the '~/components'
	components: [
		{
			path: '~/components',
			extensions: ['vue'], // ! Exclude .ts (composables etc.) and other files
			pathPrefix: false, // ! Disable path prefix
		},
	],

	// Module-specific configurations
	primevue: {
		importPT: { as: 'Wave', from: '~/presets/Wave' }, // * Import custom preset
		options: {
			theme: {
				options: {
					cssLayer: {
						name: 'primevue',
						order: 'tailwind-base, primevue, tailwind-utilities',
					},
				},
			},
			unstyled: true, // ! Disable built-in styles
			ptOptions: {
				mergeProps: true, // * Merge component properties
			},
		},
	},

	// VeeValidate configuration
	veeValidate: {
		typedSchemaPackage: 'zod',
		componentNames: {
			Form: 'VeeForm',
			Field: 'VeeField',
			FieldArray: 'VeeFieldArray',
			ErrorMessage: 'VeeErrorMessage',
		},
	},

	// Routing and SSR
	routeRules: {
		'/': {
			redirect: {
				to: '/home', // Redirect from the main page to /home
				statusCode: 301,
			},
		},
		'/auth': {
			ssr: false, // ! Disable SSR for the /auth route
		},
		'/auth/recovery': {
			ssr: false, // ! Disable SSR for the /auth/recovery route
		},
		'/auth/verification': {
			ssr: false, // ! Disable SSR for the /auth/verification route
		},
	},

	// Environment and runtime configuration
	runtimeConfig: {
		public: {
			baseUrl: process.env.BASE_URL,
		},
		jwtSecret: process.env.JWT_SECRET,
		resendApiKey: process.env.RESEND_API_KEY,
		cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
		cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
		cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
	},
});
