import { useRef, useState, useCallback, useEffect } from "react";
import { type SharedProps } from "@src/types/index.types";
import { buildClassName } from "@src/utility/utilis";

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
    isArrow = true, isArrowRotate = true,
                                }: SubMenuProps) {
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
            className={buildClassName(
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
                className={buildClassName(
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
                {/* ── Freccia indicatore ──────────────────────────────── */}
                {
                    isArrow && (
                        <span
                            className={buildClassName(
                                "submenu-arrow",
                                isArrowRotate && isOpen ? "rotate-90" : ""
                            )}
                            aria-hidden="true"
                        >
                            {position.startsWith("left") ? "<" : ">"}
                        </span>
                    )
                }
            </div>

            {/* ── Pannello del submenu ──────────────────────────────────── */}
            {isOpen && (
                <div
                    role="menu"
                    aria-label={label}
                    className={buildClassName(
                        "submenu-panel",
                        `submenu-${position}`
                    )}
                >
                    <ul role="presentation">
                        {children}
                    </ul>
                </div>
            )}
        </li>
    );
}

