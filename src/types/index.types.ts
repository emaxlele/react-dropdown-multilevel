import { type CSSProperties, type ReactNode, type RefObject } from "react";

export interface SharedProps {
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
}

export interface DropdownHandle {
    dropdownRef: RefObject<HTMLDivElement>;
    toggle: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    isOpen: boolean;
}

