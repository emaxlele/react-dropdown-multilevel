import {
	useState,
	useRef,
	useEffect,
	useCallback,
	type RefObject,
} from "react";

interface UseDropdownOptions {
	isDisabled: boolean;
	disableOutsideClick: boolean;
	hoverCloseDelay?: number;
	onOpen?: () => void;
	onClose?: () => void;
}

interface UseDropdownReturn {
	isOpen: boolean;
	dropdownRef: RefObject<HTMLDivElement | null>;
	open: () => void;
	close: () => void;
	toggle: () => void;
	handleMouseEnter: () => void;
	handleMouseLeave: () => void;
}

export function useDropdown({
	isDisabled,
	disableOutsideClick,
	hoverCloseDelay = 300,
	onOpen,
	onClose,
}: UseDropdownOptions): UseDropdownReturn {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const open = useCallback(() => {
		if (isDisabled) return;
		setIsOpen(true);
		onOpen?.();
	}, [isDisabled, onOpen]);

	const close = useCallback(() => {
		setIsOpen(false);
		onClose?.();
	}, [onClose]);

	const toggle = useCallback(() => {
		if (isDisabled) return;
		setIsOpen((prev) => {
			const next = !prev;
			if (next) {
				onOpen?.();
			} else {
				onClose?.();
			}
			return next;
		});
	}, [isDisabled, onOpen, onClose]);

	const handleMouseEnter = useCallback(() => {
		if (isDisabled) return;
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
	}, [isDisabled]);

	const handleMouseLeave = useCallback(() => {
		if (isDisabled) return;
		timeoutRef.current = setTimeout(close, hoverCloseDelay);
	}, [isDisabled, close, hoverCloseDelay]);

	const handleOutsideClick = useCallback(
		(e: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(e.target as Node)
			) {
				close();
			}
		},
		[close]
	);

	// Registra/deregistra il listener per il click esterno
	useEffect(() => {
		if (disableOutsideClick && isOpen) {
			document.addEventListener("mousedown", handleOutsideClick);
		}
		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, [isOpen, disableOutsideClick, handleOutsideClick]);

	// Cleanup del timeout al unmount
	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	return {
		isOpen,
		dropdownRef,
		open,
		close,
		toggle,
		handleMouseEnter,
		handleMouseLeave,
	};
}
