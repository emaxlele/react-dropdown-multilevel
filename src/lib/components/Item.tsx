import React from "react";
import {SharedProps} from "../types/index.types";

export interface ItemProps extends SharedProps {
    onClick?: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void,
    isActive?: boolean,
    isDisabled?: boolean,
    whiteSpace?: 'whitespace-normal' | 'whitespace-nowrap' | "whitespace-pre" | "whitespace-pre-line" | "whitespace-pre-wrap" | "whitespace-break-spaces",
};

export default function Item (
    props: ItemProps) {
    const {
        children,
        onClick = () => null,
        isActive = false,
        className = "",
        isDisabled = false,
        whiteSpace = 'whitespace-break-spaces',
        style = {}
    } = props

    return (
        <li
            style={style}
            className={`item ${isActive ? 'active' : ''} ${className}  ${isDisabled ? 'disabled' : ''} ${whiteSpace}`}
            onClick={isDisabled ? undefined : onClick}
            tabIndex={0}
        >
            {children && children}
        </li>
    )
}