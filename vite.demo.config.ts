import { defineConfig, type UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { aliases } from "./vite.config";

// Build della demo (app), pubblicata su GitHub Pages.
// Separata da vite.config.ts che è in modalità "library".
// https://vitejs.dev/config/
export default defineConfig((): UserConfig => {
	return {
		base: "/react-dropdown-multilevel/",
		plugins: [react(), tailwindcss()],
		build: {
			target: "esnext",
			outDir: "dist-demo",
			emptyOutDir: true,
		},
		resolve: {
			dedupe: ["react", "react-dom"],
			alias: aliases,
		},
	};
});
