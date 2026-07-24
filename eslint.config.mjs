import eslint from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import {defineConfig} from 'eslint/config'
import tseslint from 'typescript-eslint'

export default defineConfig(
  {
    ignores: [
      '**/*.min.js',
      '**/.*cache/',
      '**/dist/',
      '**/storybook-static/',
      '**/coverage/',
      '**/node_modules/'
    ]
  },

  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  jsxA11y.flatConfigs.recommended,

  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname
      }
    }
  },

  {
    rules: {
      'no-console': ['error', {allow: ['warn', 'error', 'info']}]
    }
  },

  eslintConfigPrettier
)
