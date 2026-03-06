// eslint.config.js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import react from 'eslint-plugin-react'
import tsEslint from 'typescript-eslint'
import promiseEslint from 'eslint-plugin-promise'
import { defineConfig, globalIgnores } from 'eslint/config'
import eslintImport from 'eslint-plugin-import'

export default defineConfig([
    // Global ignores (applicati a tutti i config object)
    // 1. Global ignores
    {
        ignores: ['dist', 'node_modules', 'build', '*.config.js', 'test']
    },

    // 2. Config personalizzato per TS/TSX
    {
        files: ['**/*.{ts,tsx}'],
        plugins: {
            // Chiave: nome con cui lo usi nelle regole rule
            react,                            // Regole "react/*"
            'react-hooks': reactHooks,        // Regole "react-hooks/*"
            'react-refresh': reactRefresh,    // Regole "react-refresh/*"
            '@typescript-eslint': tsEslint.plugin,  // Regole "@typescript-eslint/*"
            'promise': promiseEslint,           // Regole "promise/*"
            "import": eslintImport // Per regole di import/export
        },
        // Preset principali
        extends: [
            // js.configs.recommended,
            // ...tsEslint.configs.recommended,
            // promiseEslint.configs["flat/recommended"],
            // // React core rules (equivalente al vecchio reactEslint.configs.flat.recommended)
            // react.configs.flat?.recommended ?? {
            //     plugins: { react },
            //     rules: {
            //         // fallback minimale se la versione del plugin non ha `configs.flat`
            //         'react/jsx-no-target-blank': 'warn',
            //         'react/no-children-prop': 'warn',
            //     },
            // },
            // reactHooks.configs.flat,
            // // React Refresh config (scegli UNO tra: recommended, vite, o next)
            // reactRefresh.configs.vite,  // Per progetti Vite
            //eslintImport.flatConfigs
        ],
        languageOptions: {
            ecmaVersion: 2024,
            //ecmaVersion: 'latest',
            sourceType: 'module', // Per librerie React con ES modules
            globals: {
                ...globals.browser,
                ...globals.es2024, // Per features moderne
            },
            parser: tsEslint.parser,
            parserOptions: {
                project: ['./tsconfig.app.json', './tsconfig.node.json'], //'./tsconfig.node.json' per vite
                tsconfigRootDir: import.meta.dirname,
                ecmaVersion: 'latest',
                ecmaFeatures: {
                    jsx: true, // Importante per React
                    impliedStrict: false, //Tratta tutti i file come se avessero "use strict" in cima, no nserve con TypeScript e ES modules
                    globalReturn: false  // ⚠️ Permetti return a livello globale, serve solo in Node.js con CommonJS
                },
            },
        },
        settings: {
            // Per l’autodetect della versione React
            react: {
                version: '19.2',
            },
        },
        linterOptions: {
            noInlineConfig: false,  // Disabilita tutti i commenti di configurazione inline nel codice.
            reportUnusedDisableDirectives: 'warn',  // Segnala quando usi eslint-disable ma non ce n'era bisogno.
            reportUnusedInlineConfigs: 'warn',  // Segnala quando usi configurazioni inline che non servono.
        },
        // Override/Merge regole
        rules: {
            //'nome-plugin/nome-regola': 'warn',
            //    ↑            ↑
            //    |            |
            //    |            └─ Nome della regola nel plugin
            //    └─ Nome con cui hai registrato il plugin
            // React
            "react/jsx-no-target-blank": "warn",
            "react/react-in-jsx-scope": "off",
            "react/no-children-prop": "warn",
            "react/display-name": "warn",
            "react/no-deprecated": "warn",
            "react/no-unescaped-entities": "warn",

            // React Refresh
            "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],

            // React Hooks
            "react-hooks/rules-of-hooks": "warn",

            // TypeScript
            "@typescript-eslint/explicit-module-boundary-types": "warn",
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/no-unused-expressions": "warn",
            // usando npx eslint . --fix con questa regola sposta tutti gli import type in una riga separata
            "@typescript-eslint/consistent-type-imports": [
                "error",
                {
                    "prefer": "type-imports",
                    "fixStyle": "separate-type-imports", // ✅ Cambiato da "inline"
                    "disallowTypeAnnotations": false
                }
            ],
            //"@typescript-eslint/no-unused-vars": "warn",
            '@typescript-eslint/no-unused-vars': [
                'warn',  // ✅ Cambiato da 'error' a 'warn'
                {
                    argsIgnorePattern: '^_',      // Ignora argomenti che iniziano con _
                    varsIgnorePattern: '^_',      // Ignora variabili che iniziano con _
                    caughtErrorsIgnorePattern: '^_',  // Ignora errori catch che iniziano con _
                    destructuredArrayIgnorePattern: '^_',  // Ignora destructuring array con _
                },
            ],

            // Promise
            "promise/always-return": "warn",
            "promise/catch-or-return": "warn",
            "promise/param-names": "warn",
            "promise/no-return-wrap": "warn",
            "promise/no-native": "off",
            "promise/no-nesting": "warn",
            "promise/no-promise-in-callback": "warn",
            "promise/no-callback-in-promise": "warn",
            "promise/avoid-new": "warn",
            "promise/no-new-statics": "warn",
            "promise/no-return-in-finally": "warn",
            "promise/valid-params": "warn",
            "promise/no-multiple-resolved": "warn",

            // General JavaScript
            "no-constant-binary-expression": "warn",
            "no-constant-condition": "warn",
            "no-useless-escape": "warn",
            "prefer-const": "warn",

            'no-unused-vars': ['warn', { varsIgnorePattern: '^[A-Z_]' }],

            // Regole del plugin import
            "import/no-commonjs": "error", // oppure "error" se vuoi bloccare i require
            "import/no-amd": "off",       // Solo se usi AMD (raro)
            "import/no-nodejs-modules": "off" // normalmente non serve
        },

        // Per dichiarare plugin esplicitamente (non necessario con extends moderni)
        // plugins: {
        //     react,
        //     'react-hooks': reactHooks,
        //     'react-refresh': reactRefresh,
        //     promiseEslint,
        // },

    },
])