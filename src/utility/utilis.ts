import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina classi condizionali (clsx) e risolve i conflitti di utility Tailwind
 * (tailwind-merge). È il classico helper `cn` dello stack Tailwind.
 */
export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}
