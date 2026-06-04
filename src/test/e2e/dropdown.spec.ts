import { test, expect, type Page } from "@playwright/test";

// ─── Costanti ─────────────────────────────────────────────────────────────────

const BASE_URL = "http://localhost:5173";
const ROOT_ID = "#root";

// ─── Helper: aspetta che React abbia montato il DOM ───────────────────────────

async function waitForReact(page: Page) {
	await page.waitForLoadState("domcontentloaded");
	await page.waitForFunction(
		(rootId) => {
			const root = document.querySelector(rootId);
			return root !== null && root.children.length > 0;
		},
		ROOT_ID,
		{ timeout: 10000 }
	);
}

// ─── Helper: selettori ────────────────────────────────────────────────────────

const getButton = (page: Page, name: string) =>
	page.getByRole("button", { name });

const getMenu = (page: Page) => page.getByRole("menu").first();

// ─── Setup ────────────────────────────────────────────────────────────────────

test.beforeEach(async ({ page }) => {
	await page.goto(BASE_URL);
	await waitForReact(page); // ← aspetta React, non la rete
});

// ─── Caso 1 — Base ────────────────────────────────────────────────────────────

test.describe("Caso 1 — Base", () => {
	test("il bottone è visibile", async ({ page }) => {
		await expect(getButton(page, "Menu Base")).toBeVisible();
	});

	test("il menu non è visibile inizialmente", async ({ page }) => {
		await expect(getMenu(page)).not.toBeAttached(); // ← più corretto di not.toBeVisible per React
	});

	test("apre il menu al click", async ({ page }) => {
		await getButton(page, "Menu Base").click();

		await expect(getMenu(page)).toBeVisible();
	});

	test("chiude il menu al secondo click (toggle)", async ({ page }) => {
		const btn = getButton(page, "Menu Base");

		await btn.click();
		await expect(getMenu(page)).toBeVisible();

		await btn.click();
		await expect(getMenu(page)).not.toBeAttached();
	});

	test("chiude il menu cliccando fuori", async ({ page }) => {
		await getButton(page, "Menu Base").click();
		await expect(getMenu(page)).toBeVisible();

		// Clicca in un punto vuoto lontano dal dropdown
		await page.locator("h1").click();

		await expect(getMenu(page)).not.toBeAttached();
	});
});

// ─── Caso 2 — Disabilitato ────────────────────────────────────────────────────

test.describe("Caso 2 — Disabilitato", () => {
	test("il bottone è disabilitato", async ({ page }) => {
		await expect(getButton(page, "Menu Disabilitato")).toBeDisabled();
	});

	test("il menu non si apre", async ({ page }) => {
		// force: true perché è disabilitato ma vogliamo comunque provarci
		await getButton(page, "Menu Disabilitato").click({ force: true });

		await expect(getMenu(page)).not.toBeAttached();
	});
});

// ─── Caso 3 — Hover ───────────────────────────────────────────────────────────

test.describe("Caso 3 — Hover", () => {
	test("apre il menu all'hover", async ({ page }) => {
		await getButton(page, "Menu Hover").hover();

		await expect(getMenu(page)).toBeVisible();
	});

	test("chiude il menu dopo il delay quando il mouse esce", async ({
		page,
	}) => {
		await getButton(page, "Menu Hover").hover();
		await expect(getMenu(page)).toBeVisible();

		// Sposta il mouse su un elemento neutro lontano
		await page.locator("h1").hover();

		// Aspetta il delay di chiusura (hoverCloseDelay = 300ms + margine)
		await page.waitForTimeout(500);

		await expect(getMenu(page)).not.toBeAttached();
	});

	test("non chiude se il mouse rimane nel dropdown", async ({ page }) => {
		const wrapper = page.locator(".dropdown").filter({
			has: getButton(page, "Menu Hover"),
		});

		await getButton(page, "Menu Hover").hover();
		await expect(getMenu(page)).toBeVisible();

		// Muoviti dentro il wrapper, non fuori
		await wrapper.hover();
		await page.waitForTimeout(500);

		await expect(getMenu(page)).toBeVisible();
	});
});

// ─── Caso 7 — forwardRef imperativo ──────────────────────────────────────────

test.describe("Caso 7 — forwardRef imperativo", () => {
	test("il bottone toggle esterno apre il menu", async ({ page }) => {
		const toggleBtn = getButton(page, "Toggle dal padre");
		const refMenu = page
			.locator(".dropdown")
			.filter({ has: getButton(page, "Menu con Ref") })
			.getByRole("menu");

		await toggleBtn.click();
		await expect(refMenu).toBeVisible();
	});

	test("il bottone toggle esterno chiude il menu", async ({ page }) => {
		const toggleBtn = getButton(page, "Toggle dal padre");
		const refMenu = page
			.locator(".dropdown")
			.filter({ has: getButton(page, "Menu con Ref") })
			.getByRole("menu");

		await toggleBtn.click(); // apre
		await expect(refMenu).toBeVisible();

		await toggleBtn.click(); // chiude
		await expect(refMenu).not.toBeAttached();
	});

	test("isOpen riflette lo stato corretto", async ({ page }) => {
		// Clicca "Leggi isOpen" → il log deve mostrare false
		await page.getByRole("button", { name: "Leggi isOpen" }).click();
		await expect(
			page.locator(".log-container") // adatta il selettore al tuo HTML
		).toContainText("isOpen = false");

		// Apri il menu → il log deve mostrare true
		await getButton(page, "Menu con Ref").click();
		await page.getByRole("button", { name: "Leggi isOpen" }).click();
		await expect(page.locator(".log-container")).toContainText(
			"isOpen = true"
		);
	});
});

// ─── Visual Regression ───────────────────────────────────────────────────────

test.describe("Visual Regression", () => {
	test("screenshot dropdown chiuso", async ({ page }) => {
		// Aspetta che la pagina sia stabile prima dello screenshot
		await page.waitForTimeout(300);
		await expect(page).toHaveScreenshot("dropdown-closed.png", {
			maxDiffPixelRatio: 0.02, // tollera il 2% di differenza
		});
	});

	test("screenshot dropdown aperto", async ({ page }) => {
		await getButton(page, "Menu Base").click();
		await expect(getMenu(page)).toBeVisible();

		// Aspetta animazioni CSS
		await page.waitForTimeout(300);
		await expect(page).toHaveScreenshot("dropdown-open.png", {
			maxDiffPixelRatio: 0.02,
		});
	});
});
