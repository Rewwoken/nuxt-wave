import { definePreset } from '@primevue/themes';
import Aura from '@primevue/themes/aura';

const SkyAura = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{sky.50}',
      100: '{sky.100}',
      200: '{sky.200}',
      300: '{sky.300}',
      400: '{sky.400}',
      500: '{sky.500}',
      600: '{sky.600}',
      700: '{sky.700}',
      800: '{sky.800}',
      900: '{sky.900}',
      950: '{sky.950}',
    },
  },
});

export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: {
    port: 8000,
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@primevue/nuxt-module',
    '@vee-validate/nuxt',
    '@nuxt/image',
  ],
  primevue: {
    options: {
      theme: {
        preset: SkyAura,
        options: {
          darkModeSelector: '.dark',
        },
      },
    },
  },
  routeRules: {
    '/': {
      redirect: {
        to: '/home',
        statusCode: 301,
      },
    },
  },
  compatibilityDate: '2024-07-04',
  css: ['primeicons/primeicons.css'],
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET,
    resendApiKey: process.env.RESEND_API_KEY,
    baseUrl: process.env.BASE_URL,
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
  },
  alias: {
    '@/*': './src/*',
  },
});
