export default defineNuxtConfig({
	// App configuration
	app: {
		// html and head settings
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
		'~/assets/css/primevue.css', // Styles for PrimeVue
		'primeicons/primeicons.css', // Icons for PrimeVue
	],

	// Runtime configuration (using environment variables)
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

	// Modules setup
	modules: [
		'@vueuse/nuxt',
		'@nuxtjs/tailwindcss',
		'@primevue/nuxt-module',
		'@vee-validate/nuxt',
		'@nuxtjs/cloudinary',
		'@nuxt/image',
		'@nuxtjs/robots',
	],

	// * Nuxt auto-imports
	imports: {
		autoImport: true,
		dirs: [
			'composables/**', // All files, directories, and subdirectories in the root composables folder
			'components/*/composables/**', // All files and folders in the composables directory that is a direct subdirectory of each component directory
			'schemas/**', // All zod schemas in files, directories, and subdirectories in the root schemas folder
		],
	},

	// * Nitro auto-imports
	nitro: {
		imports: {
			dirs: ['schemas/**'], // All zod schemas in files, directories, and subdirectories in the root schemas folder
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

	// PrimeVue configuration
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

	// Route rules
	routeRules: {
		'/': {
			redirect: {
				to: '/home', // Redirect from the main page to /home
				statusCode: 301, // Response code 301 (permanent redirect)
			},
		},
		'/auth': {
			ssr: false, // ! Disable server-side rendering for the /auth route
		},
		'/auth/recovery': {
			ssr: false, // ! Disable server-side rendering for the /auth/recovery route
		},
		'/auth/verification': {
			ssr: false, // ! Disable server-side rendering for the /auth/verification route
		},
	},

	// Aliases configuration for easier module imports
	alias: {
		'@/*': './src/*',
	},

	// Setting a date for project compatibility determination
	compatibilityDate: '2024-08-02',

	// Development server settings (port and other parameters)
	devServer: {
		port: 8000,
	},

	// Enabling and configuring devtools
	devtools: { enabled: true },
});
