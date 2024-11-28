import {CSSProperties, ReactNode} from "react";

export type SharedProps = {
    children?: ReactNode,
    className?: string,
    style?:CSSProperties
};

interface DropdownHandle {
    dropdownRef: React.RefObject<HTMLDivElement>;
    toggle: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    isOpen: boolean;
};