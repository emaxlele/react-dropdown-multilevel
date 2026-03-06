import { defineConfig } from "vitest/config"; // ← da vitest/config
import react from "@vitejs/plugin-react";
import path from "path";
import {aliases} from "./vite.config.ts";

export default defineConfig({
    plugins: [react()],
    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: "./src/test/unit/setup.ts",
        coverage: {
            reporter: ["text", "html"],
            include: ["src/components/**"],
            exclude: [
                "src/test/**",
                "node_modules/**",
            ],
        },
        // ── Cartella dei test ────────────────────────
        include: [
            "src/test/unit/**/*.{test,spec}.{ts,tsx}",
        ],

        // ── Escludi tutto il resto ───────────────────
        exclude: [
            "src/test/e2e/**",
            "src/test/manual/**",
            "node_modules/**",
        ],

    },
    resolve: {
        mainFields: ['module', 'browser', 'main'],
        dedupe: ['react', 'react-dom'],
        alias: aliases,
    },
});

