// eslint.config.js
import eslint from '@eslint/js';
import globals from 'globals';
import eslintPluginImport from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  eslint.configs.recommended,
  {
    plugins: {
      import: eslintPluginImport,
      prettier: prettierPlugin,
    },
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
      'import/extensions': [
        'error',
        'always',
        {
          js: 'always',
        },
      ],
      'prettier/prettier': 'error',
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx'],
        },
      },
    },
    ignores: ['node_modules/**', 'dist/**', 'build/**', '.env', '.env.test'],
  },
];
