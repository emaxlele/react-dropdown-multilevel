import {SharedProps} from "../types/index.types";

export interface ItemProps extends SharedProps {
    onClick?: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void,
    isActive?: boolean,
    isDisabled?: boolean,
    whiteSpace?: 'whitespace-normal' | 'whitespace-nowrap' | "whitespace-pre" | "whitespace-pre-line" | "whitespace-pre-wrap" | "whitespace-break-spaces",
    onMouseLeave?: (event: React.MouseEvent<HTMLLIElement, MouseEvent>, childrenElement?: React.ReactNode) => void,
    onMouseEnter?: (event: React.MouseEvent<HTMLLIElement, MouseEvent>, childrenElement?: React.ReactNode) => void,
    title?:React.ReactNode
};

export default function Item (
    props: ItemProps) {
    const {
        children,
        onClick = () => null,
        onMouseLeave = () => null,
        onMouseEnter = () => null,
        isActive = false,
        className = "",
        isDisabled = false,
        whiteSpace = 'whitespace-break-spaces',
        style = {},
        title
    } = props

    return (
        <li
            style={style}
            className={`item ${isActive ? 'active' : ''} ${className}  ${isDisabled ? 'disabled' : ''} ${whiteSpace}`}
            onClick={isDisabled ? undefined : onClick}
            tabIndex={0}
            onMouseEnter={(e)=>onMouseEnter(e)}
            onMouseLeave={(e)=>onMouseLeave(e)}
        >
            {title && title}
            {children && children}
        </li>
    )
}