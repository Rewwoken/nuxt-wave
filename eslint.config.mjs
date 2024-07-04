// eslint.config.mjs
import antfu from '@antfu/eslint-config';

export default antfu({
	stylistic: {
		semi: true,
		quotes: 'single',
		indent: 'tab',
		overrides: {
			'style/indent': ['off'],
			'vue/html-quotes': ['error', 'single', { avoidEscape: true }],
			'vue/script-indent': ['error', 'tab', { baseIndent: 1 }],
		},
	},
});
