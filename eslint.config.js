import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
    {
        ignores: ['dist'],
    },
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: 'module',
            parser: tsParser,
        },
        plugins: {
        react,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            '@typescript-eslint': tseslint,
        },
        extends: [
            js.configs.recommended, // Configurazioni raccomandate di ESLint per JavaScript
            'plugin:react/recommended', // Regole base per React
            'plugin:react/jsx-runtime', // Supporto JSX runtime
            'plugin:react-hooks/recommended', // Regole base per gli hook di React
            '@typescript-eslint/recommended', // Configurazioni raccomandate per TypeScript
        ],
        settings: {
        react: {
            version: '18.2',
        },
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react/jsx-no-target-blank': 'off',
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
        },
    },
];