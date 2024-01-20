import React from "react";
import {SharedProps} from "../types/index.types";

export interface DividerProps extends SharedProps {
    size?: 'sm' | 'lg',
}

export default function Divider(props: DividerProps) {
    const { size = 'sm', style = {} } = props

    return (
        <li
            style={style}
            role='separator'
            className={`divider ${size}`}
        />
    );
}