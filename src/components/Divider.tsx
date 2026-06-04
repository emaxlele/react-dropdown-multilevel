import { type JSX } from "react";
import { type SharedProps } from "@src/types/index.types";
import { cn } from "@utility/utilis.ts";

export interface DividerProps extends SharedProps {
	size?: "sm" | "lg";
	label?: string; // descrizione per screen reader
}

export default function Divider({
	size = "sm",
	style = {},
	className = "",
	label,
}: DividerProps): JSX.Element {
	return (
		<li
			style={style}
			role="separator"
			aria-label={label}
			aria-hidden={!label}
			className={cn("divider", size, className)}
		/>
	);
}
