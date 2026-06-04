import { type JSX, type KeyboardEvent } from "react";
import { type SharedProps } from "@src/types/index.types";
import { cn } from "@utility/utilis.ts";

export interface ItemProps extends SharedProps {
	onClick?: (event: React.MouseEvent<HTMLLIElement>) => void;
	onKeyDown?: (event: React.KeyboardEvent<HTMLLIElement>) => void;
	onMouseLeave?: (
		event: React.MouseEvent<HTMLLIElement>,
		children?: React.ReactNode
	) => void;
	onMouseEnter?: (
		event: React.MouseEvent<HTMLLIElement>,
		children?: React.ReactNode
	) => void;
	isActive?: boolean;
	isDisabled?: boolean;
	whiteSpace?:
		| "whitespace-normal"
		| "whitespace-nowrap"
		| "whitespace-pre"
		| "whitespace-pre-line"
		| "whitespace-pre-wrap"
		| "whitespace-break-spaces";
	title?: React.ReactNode;
	icon?: React.ReactNode;
}

export default function Item({
	children,
	onClick,
	onKeyDown,
	onMouseLeave,
	onMouseEnter,
	isActive = false,
	className = "",
	isDisabled = false,
	whiteSpace = "whitespace-break-spaces",
	style = {},
	title,
	icon,
}: ItemProps): JSX.Element {
	const content = title ?? children;

	const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
		if (isDisabled) return;
		onClick?.(e);
	};

	// Accessibilità: attiva il click anche con Enter/Space
	const handleKeyDown = (e: KeyboardEvent<HTMLLIElement>) => {
		if (isDisabled) return;
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			// Creiamo un evento sintetico di click tramite l'elemento
			(e.currentTarget as HTMLLIElement).click();
		}
		onKeyDown?.(e);
	};

	return (
		<li
			style={style}
			className={cn(
				"item",
				whiteSpace,
				isActive ? "active" : "",
				isDisabled ? "disabled" : "",
				className
			)}
			role="menuitem"
			tabIndex={isDisabled ? -1 : 0}
			aria-disabled={isDisabled}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			onMouseEnter={(e) => onMouseEnter?.(e, children)}
			onMouseLeave={(e) => onMouseLeave?.(e, children)}
		>
			{icon && (
				<span className="item-icon" aria-hidden="true">
					{icon}
				</span>
			)}
			{content}
		</li>
	);
}
