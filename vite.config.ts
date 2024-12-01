import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import checker from 'vite-plugin-checker';
import react from '@vitejs/plugin-react';
//import CssInjectedByJs from 'vite-plugin-css-injected-by-js'; //mette il css direttamente nel codice

export default defineConfig({
    plugins: [
        react(),
        dts({
            insertTypesEntry: true,
            outDir: "./dist/types"
        }),
        checker({ typescript: true }),
        //CssInjectedByJs()
    ], // Aggiungi il plugin per generare i file di dichiarazione
    build: {
        lib: {
            entry: 'src/index.tsx', // Punto di ingresso del modulo
            name: 'ReactDropdownMultilevel', // Nome del modulo (sarà usato per il nome globale nelle versioni UMD)
            fileName: (format) => {
                if (format === "es") {
                    return `esm/index.js`
                } else if (format === "cjs") {
                    return `cjs/index.js`
                } else if (format === "umd") {
                    return `umd/index.js`
                } else {
                    return `index.js`
                }
            }, // Nome del file di output, in base al formato scelto
            formats: ["es", /*"cjs",*/ /*"umd"*/] // Usa i formati ES Modules (ESM), CommonJS (CJS) e UMD (Universal Module Definition per CDN e script)
        },
        // Poiché stiamo creando una libreria, non generiamo il file HTML
        rollupOptions: {
            external: ['react', 'react-dom', 'react/jsx-runtime'], // Indica che 'react' e 'react-dom' sono dipendenze esterne e non devono essere incluse nel bundle
            output: {
                //exports: 'named', // Usa esportazioni nominate senza export default
                globals: {
                    // Definisce variabili globali per le dipendenze esterne se il formato è UMD (per il browser)
                    react: 'React', // Definisce 'React' come variabile globale quando la libreria è usata in modalità UMD
                    'react-dom': 'ReactDOM', // Definisce 'ReactDOM' come variabile globale quando la libreria è usata in modalità UMD
                },
                assetFileNames: 'styles.css',
                banner: `import '../styles.css';`
            },
        },
        cssCodeSplit: true,
        /*,
        resolve: {
            alias: {
            'src': '/src', // Facoltativo: definisci un alias per la tua cartella 'src' (utile per importazioni più concise)
            },
        },*/
    },
});