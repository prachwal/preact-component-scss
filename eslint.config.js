import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import preact from 'eslint-plugin-preact';

export default [
  // Base JavaScript recommended rules
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __APP_VERSION__: 'readonly',
        // DOM types
        HTMLElement: 'readonly',
        HTMLButtonElement: 'readonly',
        HTMLInputElement: 'readonly',
        HTMLDivElement: 'readonly',
        HTMLAnchorElement: 'readonly',
        HTMLFormElement: 'readonly',
        Event: 'readonly',
        MouseEvent: 'readonly',
        KeyboardEvent: 'readonly',
        FocusEvent: 'readonly',
        // React/Preact compatibility
        React: 'readonly',
        JSX: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      preact,
    },
    rules: {
      // TypeScript specific rules
      '@typescript-eslint/no-unused-vars': ['error', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
        args: 'after-used',
        vars: 'local'
      }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'warn',

      // Preact specific rules
      'preact/jsx-uses-react': 'off', // Not needed in Preact
      'preact/react-in-jsx-scope': 'off', // Not needed in Preact

      // General rules
      'no-console': 'warn',
      'no-unused-vars': 'off', // Use @typescript-eslint/no-unused-vars instead
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-arrow-callback': 'error',

      // Import rules
      'no-duplicate-imports': 'error',
    },
  },
  {
    ignores: [
      'dist/',
      'node_modules/',
      'coverage/',
      'docs/',
      'test-results.xml',
      'src.packed.json',
      '*.log',
      'npm-debug.log*',
      '.vscode/',
      '.idea/',
      '*.swp',
      '*.swo',
      '.DS_Store',
      'Thumbs.db',
      // Additional build artifacts
      '**/dist/',
      '**/*.min.js',
      '**/build/',
      '**/out/',
      'src/**/*.js', // Generated JS files in src
    ],
  },
];