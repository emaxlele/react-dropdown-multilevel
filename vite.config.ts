import {defineConfig, type UserConfig} from 'vite';
import dts from 'vite-plugin-dts';
import checker from 'vite-plugin-checker';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'
import path from 'path';

// ── Esporta gli alias separatamente ──────────────────────────
export const aliases = {
    "@root": path.resolve(__dirname, "."),
    "@src": path.resolve(__dirname, "src"),
    "@components": path.resolve(__dirname, "src/components"),
    "@assets": path.resolve(__dirname, "src/assets"),
    "@hooks": path.resolve(__dirname, "src/hooks"),
    "@pages": path.resolve(__dirname, "src/pages"),
    "@styles": path.resolve(__dirname, "src/styles"),
    "@utility": path.resolve(__dirname, "src/utility")
};

// https://vitejs.dev/config/
export default defineConfig(({command}):UserConfig => {
    return {
        plugins: [
            react(),
            checker({ typescript: true }),
            dts({
                // Modifica principale: entry point invece di root
                entryRoot: './src', // Questa è la directory dei file sorgente TypeScript

                // File da considerare per il rollup (i file sorgente)
                include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.d.ts'],

                exclude: [
                    'node_modules/**/*',
                    'src/test/**/*',
                    'src/**/*.test.ts',
                    'src/**/*.test.tsx',
                    'src/**/*.spec.ts',
                    'src/**/*.spec.tsx',
                ],

                // Punto di uscita dei file d.ts
                outDir: './dist',

                // Genera file proxy un entry point TypeScript basato su package.json
                insertTypesEntry: false,

                // Opzioni aggiuntive
                staticImport: true,
                copyDtsFiles: true,
                tsconfigPath: './tsconfig.app.json',
            }),
            tailwindcss(),
        ], // Aggiungi il plugin per generare i file di dichiarazione
        build: {
            target: 'esnext',
            lib: {
                entry: {
                    index: path.resolve(__dirname, 'src/index.tsx'), // Punto di ingresso della tua libreria
                },
                name: 'ReactDropdownMultilevel', // Nome del modulo (sarà usato per il nome globale nelle versioni UMD)
                fileName: (format, entryName) => {
                    if (entryName === 'index') return `index.js`

                    return `exports/${entryName}.js`
                },
                formats: ['es'],        // ✅ QUESTO garantisce ESM
            },
            outDir: 'dist',             // Dove saranno salvati i file generati
            assetsDir: undefined,
            emptyOutDir: false,         // Non svuotare la cartella dist durante il build
            rollupOptions: {
                external: [
                    'react',
                    'react/jsx-runtime',
                    'react-dom',
                    'tailwindcss',
                    /^react\//,
                    /src\/test\/.*/,    // ← escludi tutto src/test/
                    /test\/.*/,    // ← escludi tutto test/
                ],
                output: {
                    format: 'es',        // ✅ QUESTO garantisce ESM
                    // ✅ Opzioni rilevanti per ESM puro:
                    esModule: true,  // Default per format: 'es'
                    externalLiveBindings: true,  // Default
                    interop: 'auto', // ← Genera helper automaticamente
                    //                   ↑
                    // Preserva binding live degli import ESM
                    exports: 'named',  // 'auto' | 'named' | 'default' | 'none'
                    //       ↑
                    // Come esponi i moduli
                    dir: 'dist',
                    globals: {
                        react: 'React',
                        'react-dom': 'ReactDOM',
                        'react/jsx-runtime': 'react/jsx-runtime',
                        tailwindcss: 'tailwindcss'
                    },
                    //entryFileNames: '[name].js', // questa o fileName in build
                    // entryFileNames: (chunkInfo) => {
                    //     if (chunkInfo.name === 'index') return '[name].js';
                    //     return 'exports/[name].js';
                    // },
                    //chunkFileNames: 'chunks/[name]-[hash].js',
                    chunkFileNames: (chunkInfo) => {
                        //console.log(chunkInfo)
                        return 'chunks/[name]-[hash].js'
                    },
                    //assetFileNames: 'assets/[name]-[hash][extname]',
                    entryFileNames: (chunkInfo) => {
                        if (chunkInfo.name === 'index') return '[name].js';
                        return 'exports/[name].js';
                    },
                    assetFileNames: (chunkInfo) => { // questo viene ignorato se assetsDir è impostato
                        // CSS senza hash nella root
                        if (chunkInfo.names[0] === 'index.css') {
                            return 'index.css';  // index.css
                        }

                        // Altri asset con hash in assets/
                        return 'assets/[name]-[hash][extname]';
                    },
                    banner: (chunk) => {
                        if (chunk.fileName === 'index.js') {
                            return `import './index.css';`
                        } else {
                            return "";
                        }
                    },
                    //polyfillRequire: false,    // Solo per CJS compat
                }
            },
            cssCodeSplit: true,
            // Assicurati che i moduli WASM siano gestiti correttamente
            // Solo le configurazioni necessarie per FFmpeg
            //assetsInlineLimit: 0,
            // Preserva il formato dei moduli ES, importante per import.meta
            //target: 'esnext',
            //minify: 'terser',
            //sourcemap: true, // Utile per debug
        },
        resolve: {
            mainFields: ['module', 'browser', 'main'],
            dedupe: ['react', 'react-dom'],
            alias: aliases,
        },
    }
});