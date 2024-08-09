import antfu from '@antfu/eslint-config';
import tailwindcss from 'eslint-plugin-tailwindcss';

export default antfu(
	// @antfu/eslint-config settings
	{
		typescript: true,
		stylistic: {
			semi: true,
			quotes: 'single',
			indent: 'tab',
			overrides: {
				'no-return-await': ['error'],
				'node/prefer-global/process': ['error', 'always'],
				'style/indent': ['off'],
				'quotes': ['error', 'single', { avoidEscape: true }],
			},
		},
		vue: {
			overrides: {
				'vue/block-lang': ['error', { script: { lang: 'ts' } }],
				'vue/script-indent': ['error', 'tab', { baseIndent: 1 }],
				'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
				'vue/component-name-in-template-casing': ['error', 'PascalCase'],
				'vue/max-attributes-per-line': ['error', {
					singleline: { max: 1 },
					multiline: { max: 1 },
				}],
				'vue/attributes-order': ['error', {
					order: [
						'DEFINITION',
						'LIST_RENDERING',
						'CONDITIONALS',
						'RENDER_MODIFIERS',
						'GLOBAL',
						'UNIQUE',
						'SLOT',
						'TWO_WAY_BINDING',
						'OTHER_DIRECTIVES',
						'ATTR_STATIC',
						'ATTR_DYNAMIC',
						'ATTR_SHORTHAND_BOOL',
						'EVENTS',
						'CONTENT',
					],
					alphabetical: false,
				}],
			},
		},
	},
	// eslint-plugin-tailwindcss settings
	{
		plugins: { tailwindcss },
		rules: {
			'tailwindcss/enforces-negative-arbitrary-values': 'error',
			'tailwindcss/enforces-shorthand': 'warn',
			'tailwindcss/no-contradicting-classname': 'error',
			'tailwindcss/no-unnecessary-arbitrary-value': 'warn',
			'tailwindcss/classnames-order': ['warn', {
				// Validate "class" or primevue declarative passthrough like "pt:root:class", "pt:label:class" etc.
				classRegex: '^(class|pt:.+?:class)$',
			}],
			'tailwindcss/no-custom-classname': ['error', {
				// Whitelist primevue icon classes like "pi", "pi-bell" etc.
				whitelist: ['pi.*'],
				// Validate "class" or primevue declarative passthrough like "pt:root:class", "pt:label:class" etc.
				classRegex: '^(class|pt:.+?:class)$',
			}],
		},
	},
);
