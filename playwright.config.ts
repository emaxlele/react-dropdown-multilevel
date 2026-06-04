import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
	testDir: "./src/test/e2e",
	webServer: {
		command: "pnpm dev",
		url: "http://localhost:5173",
		reuseExistingServer: true,
	},
	projects: [
		{ name: "Chrome", use: { ...devices["Desktop Chrome"] } },
		{ name: "Firefox", use: { ...devices["Desktop Firefox"] } },
		{ name: "Mobile", use: { ...devices["iPhone 14"] } },
	],
});
