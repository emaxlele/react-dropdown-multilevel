import React, {useState} from "react";
import {SharedProps} from "../types/index.types";

export interface SubMenuProps extends SharedProps {
    position?: 'left' | 'right' | 'bottom' | 'left-top' | 'right-top',
};

export default function SubMenu(
    props: SubMenuProps) {
    const {
        children,
        position = 'left',
        className = "",
        style = {}
    } = props
    const [open, setOpen] = useState(false);


    return (
        <div
            style={style}
            className={`submenu ${position} ${className}`}
        >
            <ul>
                {children && children}
            </ul>
        </div>
    )
}