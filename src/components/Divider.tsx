import {type SharedProps} from "@src/types/index.types";
import {buildClassName} from "@utility/utilis.ts";

export interface DividerProps extends SharedProps {
    size?: "sm" | "lg";
    label?: string; // descrizione per screen reader
}

export default function Divider({
                                    size = "sm",
                                    style = {},
                                    className = "",
                                    label,
                                }: DividerProps) {
    return (
        <li
            style={style}
            role="separator"
            aria-label={label}
            aria-hidden={!label}
            className={buildClassName("divider", size, className)}
        />
    );
}
