// eslint.config.js
import eslint from '@eslint/js';
import globals from 'globals';

export default [
  eslint.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.jest,
        __dirname: 'readonly',
        __filename: 'readonly',
        require: 'readonly',
        process: 'readonly',
      },
    },
    rules: {
      'no-console': 'warn',
    },
    ignores: ['node_modules/**', 'dist/**', 'build/**', '.env', '.env.test'],
  },
];
