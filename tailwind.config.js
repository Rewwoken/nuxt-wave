/** @type {import('tailwindcss').Config} */

export default {
	content: ['./presets/**/*.{js,vue,ts}'],
	theme: {
		fontFamily: {
			sans: [
				'Inter',
				'ui-sans-serif',
				'system-ui',
				'-apple-system',
				'BlinkMacSystemFont',
				'Segoe UI',
				'Roboto',
				'Helvetica Neue',
				'Arial',
				'Noto Sans',
				'sans-serif',
				'Apple Color Emoji',
				'Segoe UI Emoji',
				'Segoe UI Symbol',
				'Noto Color Emoji',
			],
		},
		extend: {
			colors: {
				'bg-color': 'var(--p-bg-color)',
				'bg-contrast-color': 'var(--p-bg-color)',
			},
			backgroundColor: {
				color: 'var(--p-bg-color)',
			},
		},
	},
	darkMode: 'class',
	plugins: [require('tailwindcss-primeui')],
};
