import { useRef, useState, useCallback, useEffect, type JSX } from "react";
import { type SharedProps } from "@src/types/index.types";
import { cn } from "@src/utility/utilis";

export interface SubMenuProps extends SharedProps {
	position?: "left" | "right" | "bottom" | "left-top" | "right-top";
	label?: string;
	title: React.ReactNode; // ← trigger obbligatorio
	isDisabled?: boolean;
	hoverCloseDelay?: number;
	isArrow?: boolean;
	isArrowRotate?: boolean;
}

export default function SubMenu({
	children,
	position = "right",
	className = "",
	style = {},
	label = "Submenu",
	title,
	isDisabled = false,
	hoverCloseDelay = 200,
	isArrow = true,
	isArrowRotate = true,
}: SubMenuProps): JSX.Element {
	const [isOpen, setIsOpen] = useState(false);
	const wrapperRef = useRef<HTMLLIElement>(null);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	// ── Cleanup al unmount ────────────────────────────────────────────────────
	useEffect(() => {
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, []);

	const open = useCallback(() => {
		if (isDisabled) return;
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
		setIsOpen(true);
	}, [isDisabled]);

	const close = useCallback(() => {
		timeoutRef.current = setTimeout(() => {
			setIsOpen(false);
		}, hoverCloseDelay);
	}, [hoverCloseDelay]);

	return (
		<li
			ref={wrapperRef}
			role="none"
			style={style}
			className={cn(
				"submenu-wrapper",
				isDisabled ? "disabled" : "",
				className
			)}
			onMouseEnter={open}
			onMouseLeave={close}
		>
			{/* ── Trigger ──────────────────────────────────────────────── */}
			<div
				role="menuitem"
				tabIndex={isDisabled ? -1 : 0}
				aria-haspopup="true"
				aria-expanded={isOpen}
				aria-disabled={isDisabled}
				className={cn(
					"submenu-trigger",
					"item",
					isOpen ? "active" : "",
					isDisabled ? "disabled" : ""
				)}
				// Supporto tastiera
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.preventDefault();
						setIsOpen((prev) => !prev);
					}
					if (e.key === "Escape") {
						setIsOpen(false);
					}
				}}
			>
				{title}
				{/* ── Freccia indicatore (chevron SVG inline, zero-dep) ── */}
				{isArrow && (
					<span
						className={cn(
							"submenu-arrow",
							position.startsWith("left")
								? "submenu-arrow-left"
								: "submenu-arrow-right",
							isArrowRotate && isOpen ? "rotate-90" : ""
						)}
						aria-hidden="true"
					>
						<svg
							width="1em"
							height="1em"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							{position.startsWith("left") ? (
								<polyline points="15 18 9 12 15 6" />
							) : (
								<polyline points="9 18 15 12 9 6" />
							)}
						</svg>
					</span>
				)}
			</div>

			{/* ── Pannello del submenu ──────────────────────────────────── */}
			{isOpen && (
				<div
					role="menu"
					aria-label={label}
					className={cn(
						"submenu-panel",
						"animate-in fade-in-0 zoom-in-95 duration-150",
						`submenu-${position}`
					)}
				>
					<ul role="presentation">{children}</ul>
				</div>
			)}
		</li>
	);
}
