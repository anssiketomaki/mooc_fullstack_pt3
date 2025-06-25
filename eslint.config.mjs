import js from '@eslint/js'
import globals from 'globals'
import stylisticJs from '@stylistic/eslint-plugin'

// The export is an array of configuration objects
export default [
  {
    ignores: ['dist/'],
  },

  // Base JavaScript recommended rules
  js.configs.recommended,

  // STYLISTIC RULES OBJECT
  {
    files: ['**/*.js'], // Target your JavaScript files

    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.node,
        process: 'readonly'
        },
    },

    plugins: {
      '@stylistic': stylisticJs
    },

    rules: {
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { 'before': true, 'after': true }],
      'no-console': 0, // 0 = off, 1 = warn, 2 = error

      '@stylistic/indent': ['error', 2],
      '@stylistic/linebreak-style': ['error', 'unix'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'never']
    },
  },

]
