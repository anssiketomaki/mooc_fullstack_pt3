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
    files: ['**/*.{js,mjs,cjs,jsx}'], // Target your JavaScript/React files
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
    }
  },

  // Configuration for Node.js environment globals
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        process: 'readonly' // A common one to add for Vite/Node envs
      }
    }
  },

]
