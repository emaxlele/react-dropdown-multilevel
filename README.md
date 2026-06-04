![emaxlele](https://static.emaxlele.com/img/logo/logo.svg)

# react-dropdown-multilevel

> Accessible, multilevel dropdown component for React — zero heavy deps, keyboard-ready.

[![npm version](https://img.shields.io/npm/v/react-dropdown-multilevel?style=flat-square)](https://www.npmjs.com/package/react-dropdown-multilevel)
[![npm downloads](https://img.shields.io/npm/dy/react-dropdown-multilevel?style=flat-square)](https://www.npmjs.com/package/react-dropdown-multilevel)
[![license](https://img.shields.io/npm/l/react-dropdown-multilevel?style=flat-square)](https://github.com/emaxlele/react-dropdown-multilevel/blob/main/LICENSE)

**[🚀 Live demo](https://emaxlele.github.io/react-dropdown-multilevel/)** ·
**[📦 npm](https://www.npmjs.com/package/react-dropdown-multilevel)** ·
**[💻 GitHub](https://github.com/emaxlele/react-dropdown-multilevel)**

![React multilevel dropdown](https://raw.githubusercontent.com/emaxlele/react-dropdown-multilevel/main/src/images/example.png)

## Table of Contents

-   [Install](#install)
-   [Usage](#usage)
-   [Accessibility & keyboard](#accessibilità--tastiera)
-   [Props](#props)
-   [Development](#development)
-   [License](#license)

## Install

Install the package from npm:

```bash
npm install react-dropdown-multilevel
# or
pnpm add react-dropdown-multilevel
# or
yarn add react-dropdown-multilevel
```

Peer dependencies: `react` and `react-dom` (>= 18).

The component's CSS is bundled and imported automatically — **no extra CSS import is required**.

## Usage

```jsx
// Default import
import DropDownMultilevel from "react-dropdown-multilevel";

export const TestMenuComponent = (props) => {
	return (
		<DropDownMultilevel title="Dropdown title">
			<DropDownMultilevel.Item onClick={() => doSomething()}>
				Item 1
			</DropDownMultilevel.Item>
			<DropDownMultilevel.Item>
				Item 2
				<DropDownMultilevel.SubMenu>
					<DropDownMultilevel.Item>Subitem 1</DropDownMultilevel.Item>
				</DropDownMultilevel.SubMenu>
			</DropDownMultilevel.Item>
		</DropDownMultilevel>
	);
};

// or named imports
import DropDownMultilevel, {
	Divider,
	Item,
	SubMenu,
} from "react-dropdown-multilevel";

export const TestMenuComponent = (props) => {
	return (
		<DropDownMultilevel title="Dropdown title">
			<Item onClick={() => doSomething()}>Item 1</Item>
			<Item>
				Item 2
				<SubMenu>
					<Item>Subitem 1</Item>
				</SubMenu>
			</Item>
		</DropDownMultilevel>
	);
};
```

## Accessibilità & tastiera

Il componente segue l'ARIA _menu button_ pattern. Quando il bottone ha il focus:

| Tasto             | Azione                                         |
| :---------------- | :--------------------------------------------- |
| `Enter` / `Space` | apre/chiude il menu                            |
| `↓` ArrowDown     | apre il menu e mette a fuoco il primo elemento |
| `↑` ArrowUp       | apre il menu e mette a fuoco l'ultimo elemento |

Quando il menu è aperto:

| Tasto          | Azione                                        |
| :------------- | :-------------------------------------------- |
| `↓` / `↑`      | sposta il focus tra gli elementi (con wrap)   |
| `Home` / `End` | primo / ultimo elemento                       |
| `Esc`          | chiude il menu e riporta il focus sul bottone |
| `Tab`          | chiude il menu e prosegue la tabulazione      |

## Props

#### Dropdown

| NAME             | TYPE                                                                       | DEFAULT VALUE |
| :--------------- | :------------------------------------------------------------------------- | :------------ | ---- |
| children         | ReactNode                                                                  | ReactNode[]   | null |
| title            | ReactNode                                                                  | ReactNode[]   | null |
| isDisabled       | boolean                                                                    | false         |
| position         | "left", "right", "top-right", "top-left"                                   | left          |
| buttonVariant    | "primary", "secondary", "tertiary", "special", "special-success", "dashed" | secondary     |
| isActive         | boolean                                                                    | false         |
| openOnHover      | boolean                                                                    | false         |
| wrapperClassName | string                                                                     | null          |
| buttonClassName  | string                                                                     | null          |
| menuClassName    | string                                                                     | null          |
| onClick          | (x?: any) => any                                                           | () => null    |

#### Item

| NAME       | TYPE             | DEFAULT VALUE |
| :--------- | :--------------- | :------------ | ---- |
| children   | ReactNode        | ReactNode[]   | null |
| onClick    | (x?: any) => any | () => null    |
| isActive   | boolean          | false         |
| className  | string           | null          |
| isDisabled | boolean          | false         |

#### Submenu

| NAME      | TYPE                                               | DEFAULT VALUE |
| :-------- | :------------------------------------------------- | :------------ | ---- |
| children  | ReactNode                                          | ReactNode[]   | null |
| position  | "left", "right", "bottom", "left-top", "right-top" | left          |
| className | string                                             | null          |

## Development

Per lavorare sulla libreria in locale (richiede [pnpm](https://pnpm.io)):

```bash
# 1. Installa le dipendenze
pnpm install

# 2. Installa i browser di Playwright (per gli e2e)
pnpm exec playwright install

# ── Demo / Playground ────────────────────────
pnpm dev                  # apri http://localhost:5173

# ── Qualità ──────────────────────────────────
pnpm typecheck            # controllo tipi (tsc -b)
pnpm lint                 # eslint

# ── Test ─────────────────────────────────────
pnpm test                 # vitest (unit)
pnpm test:e2e             # playwright (e2e, tutti i browser)
pnpm test:all             # unit + e2e

# ── Build libreria ───────────────────────────
pnpm build                # genera dist/ (ESM + .d.ts + CSS)
```

La pubblicazione su npm avviene in automatico via GitHub Actions
(`.github/workflows/publish.yml`, OIDC Trusted Publishing) quando viene
pubblicata una release con tag `vX.Y.Z` allineato a `package.json`.

## License

[Apache-2.0](https://github.com/emaxlele/react-dropdown-multilevel/blob/main/LICENSE) © emaxlele
</content>
