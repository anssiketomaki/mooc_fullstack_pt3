import js from "@eslint/js";
import globals from "globals";
import stylisticJs from '@stylistic/eslint-plugin-js'; // You already imported this, great!
import pluginReact from "eslint-plugin-react";

// The export is an array of configuration objects
export default [
  // Base JavaScript recommended rules
  js.configs.recommended,

  // React recommended rules
  pluginReact.configs.flat.recommended,
  
  // STYLISTIC RULES OBJECT
  {
    files: ["**/*.{js,mjs,cjs,jsx}"], // Target your JavaScript/React files
    plugins: {
      '@stylistic/js': stylisticJs
    },
    rules: {
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { 'before': true, 'after': true }],
      'no-console': 0, // 0 = off, 1 = warn, 2 = error

      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'never']
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

  // Settings specifically for React files if needed
  {
      files: ['**/*.{js,jsx,mjs,cjs}'],
      plugins: {
        react: pluginReact
      },
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      rules: {
        'react/react-in-jsx-scope': 'off', // Not needed with modern React/Vite
        'react/prop-types': 0 // Turn off prop-types if you're using TypeScript or not using them
      }
  }
];