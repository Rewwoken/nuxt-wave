/** @type {import('tailwindcss').Config} */

export default {
	content: ['./presets/**/*.{js,vue,ts}'],
	theme: {
		fontFamily: {
			sans: ['Inter', 'sans-serif'],
		},
	},
	darkMode: 'class',
	plugins: [require('tailwindcss-primeui')],
};
