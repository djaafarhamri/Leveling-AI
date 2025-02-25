import globals from 'globals'
import pluginJs from '@eslint/js'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { 
    files: ['**/*.js'], 
    languageOptions: { sourceType: 'commonjs' } 
  },
  { 
    languageOptions: { globals: globals.node } 
  },
  pluginJs.configs.recommended,
  {
    rules: {
      semi: ['error', 'never'],
      quotes: ['error', 'single'],
      'no-multiple-empty-lines': ['error', { 'max': 1 }] // No more than 1 blank line
    }
  }
]
