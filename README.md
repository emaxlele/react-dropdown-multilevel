![emaxlele - Making social media a piece of cake](https://static.emaxlele.com/img/logo/logo.svg)

# react-dropdown-multilevel by emaxlele

ReactJS multilevel dropdown component

come avviare

```bash
# 1. Installa dipendenze (richiede pnpm)
pnpm install

# 2. Installa browser di Playwright
pnpm exec playwright install

# ── Demo / Playground ────────────────────────
pnpm dev                  # apri http://localhost:5173

# ── Qualità ──────────────────────────────────
pnpm typecheck            # controllo tipi (tsc -b)
pnpm lint                 # eslint

# ── Vitest ───────────────────────────────────
pnpm test                 # esegue i test una volta
pnpm test:watch           # watch mode
pnpm test:ui              # interfaccia grafica
pnpm test:coverage        # report copertura

# ── Playwright ───────────────────────────────
pnpm test:e2e             # tutti i browser
pnpm test:e2e:ui          # interfaccia grafica

# ── Tutto insieme ────────────────────────────
pnpm test:all

# ── Build libreria ───────────────────────────
pnpm build                # genera dist/ (ESM + .d.ts + CSS)
```

[📒 STORYBOOK](https://github.com/emaxlele/react-dropdown-multilevel-master)

[![npm](https://img.shields.io/npm/v/react-dropdown-multilevel?style=plastic)](https://www.npmjs.com/package/react-dropdown-multilevel)
[![NPM](https://img.shields.io/npm/l/react-dropdown-multilevel)](https://github.com/emaxlele/react-dropdown-multilevel-master/blob/main/LICENSE)
[![NPM](https://img.shields.io/npm/dy/react-dropdown-multilevel?style=plastic)](https://www.npmjs.com/package/react-dropdown-multilevel)

![React multilevel dropdown](https://github.com/emaxlele/react-dropdown-multilevel-master/blob/main/src/lib/images/example.png)

## Table of Contents

-   [Install](#install)
-   [Testing](#testing)
-   [Example](#example)
-   [Docs](#docs)
    -   [Props](#props)

## Install

Install the npm package.

**NPM:** [npmjs.com/package/react-dropdown-multilevel](https://www.npmjs.com/package/react-dropdown-multilevel)

```bash
npm install react-dropdown-multilevel
# or
yarn add react-dropdown-multilevel
```

## Testing

`npm run storybook`

## Example

```jsx
// Import default
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
// or
// Import denomination
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

## Docs

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
