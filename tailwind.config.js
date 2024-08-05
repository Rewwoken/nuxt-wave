/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';

export default {
	darkMode: 'class',
	content: [],
	theme: {
		fontFamily: {
			sans: ['Inter', 'sans-serif'], // maybe not main?
		},
		extend: {
			colors: {
				dim: '#020420',
				primary: colors.sky,
			},
		},
	},
	plugins: [],
};
