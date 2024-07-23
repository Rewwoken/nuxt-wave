import antfu from '@antfu/eslint-config';

export default antfu({
  vue: true,
  typescript: true,
  stylistic: {
    semi: true,
    quotes: 'single',
    indent: 2,
    overrides: {
      'style/indent': ['off'],
      'vue/html-quotes': ['error', 'double', { avoidEscape: true }],
      'vue/script-indent': ['error', 2, { baseIndent: 1 }],
      'no-return-await': ['error'],
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: {
            max: 1,
          },
          multiline: {
            max: 1,
          },
        },
      ],
      'vue/block-lang': [
        'error',
        {
          script: {
            lang: 'ts',
          },
        },
      ],
      'vue/block-order': [
        'error',
        {
          order: ['script', 'template', 'style'],
        },
      ],
      'node/prefer-global/process': ['error', 'always'],
    },
  },
});
