// generico:

declare const _default: import("vite").UserConfigFnObject;
export default _default;


/// <reference types="vite/client" />
/*
import { UserConfig } from 'vite';

declare module 'vite' {
    interface UserConfig {
        build?: {
            lib?: {
                entry: string; // Punto di ingresso per la libreria
                name: string;  // Nome della libreria per il formato UMD
                fileName: (format: string) => string; // Funzione per generare il nome del file
                formats: ('es' | 'cjs' | 'umd')[]; // Tipi di formati di uscita
            };
        };
    }
}*/