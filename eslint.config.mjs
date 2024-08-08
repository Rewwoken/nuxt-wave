import antfu from '@antfu/eslint-config';

export default antfu({
	typescript: true,
	stylistic: {
		semi: true,
		quotes: 'single',
		indent: 'tab',
		overrides: {
			'no-return-await': ['error'],
			'node/prefer-global/process': ['error', 'always'],
			'style/indent': ['off'],
		},
	},
	vue: {
		overrides: {
			'vue/block-lang': ['error', { script: { lang: 'ts' } }],
			'vue/script-indent': ['error', 'tab', { baseIndent: 1 }],
			'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
			'vue/max-attributes-per-line': ['error', {
				singleline: { max: 1 },
				multiline: { max: 1 },
			}],
		},
	},
});
