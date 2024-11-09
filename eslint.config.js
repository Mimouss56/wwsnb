import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
    eslint.configs.recommended,
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.es2021,
                getActualUserName: 'readonly',
                capitalizeFirstLetter: 'readonly',
                getAllUsers: 'readonly',
                setupInputListener: 'readonly',
                handleInput: 'readonly',
                handleKeyDown: 'readonly',
                handleBlur: 'readonly',
                showSuggestions: 'readonly',
                hideSuggestions: 'readonly',
                navigateSuggestions: 'readonly',
                selectSuggestion: 'readonly',
                setupReactions: 'readonly',
                initializeReactions: 'readonly',
                saveReactionsToStorage: 'readonly',
                loadReactionsFromStorage: 'readonly',
                updateAllReactionDisplays: 'readonly',
                addReaction: 'readonly',
                updateReactionDisplay: 'readonly',
                setupMentions: 'readonly',

            },
            parser: tseslint.parser,
            parserOptions: {
                project: './tsconfig.json',
            },
            ecmaVersion: 2021,
            sourceType: 'module',
        },
        rules: {
            'indent': ['error', 4],
            'linebreak-style': ['error', 'unix'],
            'quotes': ['error', 'single'],
            'semi': ['error', 'always'],
            'no-unused-vars': ['off'],
            'no-console': ['warn', { 'allow': ['warn', 'error', 'log'] }],
            'curly': ['error'],
            'brace-style': ['error', '1tbs'],
            'keyword-spacing': ['error'],
            'space-before-blocks': ['error'],
            'space-before-function-paren': ['error', {
                'anonymous': 'always',
                'named': 'never',
                'asyncArrow': 'always'
            }],
            'space-in-parens': ['error', 'never'],
            'space-infix-ops': 'error',
            'comma-spacing': ['error', { 'before': false, 'after': true }],
            'comma-style': ['error', 'last'],
            'no-multiple-empty-lines': ['error', { 'max': 2, 'maxEOF': 1 }],
            'padded-blocks': ['error', 'never'],
            'camelcase': ['error'],
            'no-trailing-spaces': 'error',
            'no-undef': 'off',
        },
        ignores: [
            '.github/**',
            'icons/**',
            'node_modules/**',
            'web-ext-artifacts/**',
            '.amo-upload-uuid',
            '.gitignore',
            '.eslintignore',
            '.eslintrc.json',
            '.web-extension-id',
            'CODE_OF_CONDUCT.md',
            'CONTRIBUTING.md',
            'CONTRIBUTORS.md',
            'KNOWN_ISSUES.md',
            'LICENSE',
            'manifest.json',
            'package.json',
            'package-lock.json',
            'README.md',
            'TODO.md'
        ]
    }
];