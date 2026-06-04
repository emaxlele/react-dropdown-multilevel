import {
	type CSSProperties,
	forwardRef,
	useCallback,
	useEffect,
	useId,
	useImperativeHandle,
	useRef,
} from "react";
import Item, { type ItemProps } from "./Item";
import SubMenu, { type SubMenuProps } from "./SubMenu";
import Divider, { type DividerProps } from "./Divider";
import { useDropdown } from "../hooks/useDropdown";
import { type SharedProps, type DropdownHandle } from "@src/types/index.types";
import { cn } from "@src/utility/utilis";

export interface DropdownProps extends SharedProps {
	title?: React.ReactNode;
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	onMouseOver?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	onMouseLeave?: (event: React.MouseEvent<HTMLDivElement>) => void;
	onMouseEnter?: (event: React.MouseEvent<HTMLDivElement>) => void;
	onOpen?: () => void;
	onClose?: () => void;
	isMouseEvent?: boolean;
	disableOutsideClick?: boolean;
	isActive?: boolean;
	isDisabled?: boolean;
	position?: "left" | "right" | "top-right" | "top-left";
	wrapperClassName?: string;
	buttonClassName?: string;
	menuClassName?: string;
	buttonVariant?:
		| "primary"
		| "secondary"
		| "tertiary"
		| "special"
		| "special-success"
		| "dashed";
	openOnHover?: boolean;
	isDropDown?: boolean;
	hoverCloseDelay?: number;
	styleMenu?: CSSProperties;
}

// ─── Tipo composto: ForwardRef + proprietà statiche ───────────────────────────
type DropdownMultilevelType = React.ForwardRefExoticComponent<
	DropdownProps & React.RefAttributes<DropdownHandle>
> & {
	Item: React.FC<ItemProps>;
	Divider: React.FC<DividerProps>;
	SubMenu: React.FC<SubMenuProps>;
};

// ─── Componente ───────────────────────────────────────────────────────────────
const DropdownMultilevel = forwardRef<DropdownHandle, DropdownProps>(
	function DropdownMultilevel(props, ref) {
		const {
			title,
			children,
			isDisabled = false,
			position = "left",
			wrapperClassName = "",
			buttonClassName = "",
			menuClassName = "",
			disableOutsideClick = true,
			onClick,
			onMouseOver,
			onMouseLeave: onMouseLeaveProp,
			onMouseEnter: onMouseEnterProp,
			onOpen,
			onClose,
			isMouseEvent = true,
			isActive = false,
			buttonVariant = "secondary",
			openOnHover = false,
			className = "",
			isDropDown = true,
			style = {},
			styleMenu = {},
			hoverCloseDelay = 300,
		} = props;

		const {
			isOpen,
			dropdownRef,
			toggle,
			open,
			close,
			handleMouseEnter,
			handleMouseLeave,
		} = useDropdown({
			isDisabled,
			disableOutsideClick,
			hoverCloseDelay,
			onOpen,
			onClose,
		});

		const buttonRef = useRef<HTMLButtonElement>(null);
		const menuRef = useRef<HTMLDivElement>(null);
		// Memorizza un'eventuale richiesta di focus da eseguire all'apertura
		// (apertura via tastiera): il menu non è ancora nel DOM nel handler.
		const pendingFocusRef = useRef<"first" | "last" | null>(null);

		const reactId = useId();
		const buttonId = `dropdown-button-${reactId}`;
		const menuId = `dropdown-menu-${reactId}`;

		// ── Navigazione da tastiera (ARIA menu pattern) ───────────────────────
		const getMenuItems = useCallback((): HTMLElement[] => {
			if (!menuRef.current) return [];
			return Array.from(
				menuRef.current.querySelectorAll<HTMLElement>(
					'[role="menuitem"]'
				)
			).filter((el) => el.getAttribute("aria-disabled") !== "true");
		}, []);

		const focusItemAt = useCallback(
			(index: number) => {
				const items = getMenuItems();
				if (items.length === 0) return;
				const i =
					((index % items.length) + items.length) % items.length;
				items[i]?.focus();
			},
			[getMenuItems]
		);

		const moveFocus = useCallback(
			(dir: 1 | -1) => {
				const items = getMenuItems();
				if (items.length === 0) return;
				const current = items.indexOf(
					document.activeElement as HTMLElement
				);
				const next =
					current === -1
						? dir === 1
							? 0
							: items.length - 1
						: current + dir;
				focusItemAt(next);
			},
			[getMenuItems, focusItemAt]
		);

		const closeAndFocusButton = useCallback(() => {
			close();
			buttonRef.current?.focus();
		}, [close]);

		// All'apertura via tastiera, sposta il focus sul primo/ultimo item.
		useEffect(() => {
			if (!isOpen || pendingFocusRef.current === null) return;
			const target = pendingFocusRef.current;
			pendingFocusRef.current = null;
			focusItemAt(target === "first" ? 0 : -1);
		}, [isOpen, focusItemAt]);

		const stopEventIfNeeded = useCallback(
			(e: React.MouseEvent) => {
				if (isMouseEvent) {
					e.preventDefault();
					e.stopPropagation();
				}
			},
			[isMouseEvent]
		);

		useImperativeHandle(
			ref,
			() => ({
				dropdownRef,
				toggle: (e: React.MouseEvent<HTMLButtonElement>) => {
					stopEventIfNeeded(e);
					toggle();
				},
				isOpen,
			}),
			[dropdownRef, toggle, isOpen, stopEventIfNeeded]
		);

		const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
			stopEventIfNeeded(e);
			onClick?.(e);
			toggle();
		};

		const handleButtonMouseOver = (
			e: React.MouseEvent<HTMLButtonElement>
		) => {
			stopEventIfNeeded(e);
			onMouseOver?.(e);
			open();
		};

		const handleButtonKeyDown = (
			e: React.KeyboardEvent<HTMLButtonElement>
		) => {
			if (isDisabled) return;
			if (e.key === "ArrowDown") {
				e.preventDefault();
				if (isOpen) {
					focusItemAt(0);
				} else {
					pendingFocusRef.current = "first";
					open();
				}
			} else if (e.key === "ArrowUp") {
				e.preventDefault();
				if (isOpen) {
					focusItemAt(-1);
				} else {
					pendingFocusRef.current = "last";
					open();
				}
			} else if (e.key === "Escape" && isOpen) {
				e.preventDefault();
				close();
			}
		};

		const handleMenuKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
			switch (e.key) {
				case "ArrowDown":
					e.preventDefault();
					moveFocus(1);
					break;
				case "ArrowUp":
					e.preventDefault();
					moveFocus(-1);
					break;
				case "Home":
					e.preventDefault();
					focusItemAt(0);
					break;
				case "End":
					e.preventDefault();
					focusItemAt(-1);
					break;
				case "Escape":
					e.preventDefault();
					closeAndFocusButton();
					break;
				case "Tab":
					// Chiude il menu lasciando proseguire il Tab naturale.
					close();
					break;
			}
		};

		const handleWrapperMouseLeave = (
			e: React.MouseEvent<HTMLDivElement>
		) => {
			onMouseLeaveProp?.(e);
			handleMouseLeave();
		};

		const handleWrapperMouseEnter = (
			e: React.MouseEvent<HTMLDivElement>
		) => {
			onMouseEnterProp?.(e);
			handleMouseEnter();
		};

		const buttonLabel = title ?? "button";

		return (
			<div
				ref={dropdownRef}
				style={style}
				className={cn("dropdown", wrapperClassName, className)}
				onMouseLeave={handleWrapperMouseLeave}
				onMouseEnter={handleWrapperMouseEnter}
			>
				<button
					ref={buttonRef}
					type="button"
					id={buttonId}
					className={cn(
						"button",
						`button-${buttonVariant}`,
						isOpen || isActive ? "active" : "",
						isDisabled ? "disabled" : "",
						buttonClassName
					)}
					disabled={isDisabled}
					tabIndex={isDisabled ? -1 : 0}
					aria-haspopup="menu"
					aria-expanded={isOpen}
					aria-controls={isDropDown && isOpen ? menuId : undefined}
					onClick={!openOnHover ? handleButtonClick : undefined}
					onMouseOver={
						openOnHover ? handleButtonMouseOver : undefined
					}
					onKeyDown={handleButtonKeyDown}
				>
					{buttonLabel}
				</button>

				{isDropDown && children && isOpen && (
					<div
						ref={menuRef}
						id={menuId}
						role="menu"
						aria-labelledby={buttonId}
						style={styleMenu}
						className={cn(
							"menu",
							"animate-in fade-in-0 zoom-in-95 duration-150",
							`menu-${position}`,
							menuClassName
						)}
						onKeyDown={handleMenuKeyDown}
					>
						<ul role="presentation">{children}</ul>
					</div>
				)}
			</div>
		);
	}
	// ✅ Cast al tipo composto invece di lasciare il tipo inferito da forwardRef
) as DropdownMultilevelType;

DropdownMultilevel.displayName = "DropdownMultilevel";

// ✅ Ora TypeScript conosce queste proprietà grazie a DropdownMultilevelType
DropdownMultilevel.Item = Item;
DropdownMultilevel.Divider = Divider;
DropdownMultilevel.SubMenu = SubMenu;

export default DropdownMultilevel;
