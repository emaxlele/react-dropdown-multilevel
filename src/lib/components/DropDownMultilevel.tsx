import React, {
    useState, useRef, useEffect, useCallback, CSSProperties, Children,
} from 'react';
import Item from "./Item";
import SubMenu from "./SubMenu";
import Divider from "./Divider";
import {SharedProps} from "../types/index.types";

function DropDownMultilevel (props:DropdownProps) {
    const {
        title, children, isDisabled = false,
        position = 'left', wrapperClassName = "",
        buttonClassName = "", menuClassName = "", onClick = () => null,
        isActive = false, buttonVariant = 'secondary',
        openOnHover = false, className = "", isDropDown = true, style = {},
        styleMenu = {}
    } = props

    const childrenCount = Children.count(children);
    const [isOpen, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    let timeoutId:NodeJS.Timeout | null = null;


    useEffect(() => () => {
        document.removeEventListener('mousedown', handleClick);
    }, []);

    const handleClick = useCallback((e: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
            setOpen(false);
            document.removeEventListener('mousedown', handleClick);
        }
    }, []);
    const handleButtonOnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (isDisabled) return;
        onClick(e);
        setOpen(!isOpen);
        if (isOpen) {
            document.removeEventListener('mousedown', handleClick);
        } else {
            document.addEventListener('mousedown', handleClick);
        }
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (isDisabled) return;
        timeoutId = setTimeout(() => {
            setOpen(false);
            document.removeEventListener('mousedown', handleClick);
        }, 500)
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (isDisabled) return;
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
    };

    return (
        <div
            style={style}
            className={`dropdown ${wrapperClassName} ${className}`}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
        >
            <button
                type='button'
                className={`button ${isOpen || isActive ? 'active' : ''} ${isDisabled ? 'disabled' : ''} ${buttonVariant} ${buttonClassName}`}
                disabled={isDisabled}
                tabIndex={0}
                onClick={!openOnHover ? handleButtonOnClick : undefined}
                onMouseOver={openOnHover ? handleButtonOnClick : undefined}
            >
                {(!children || title ? title : children) ?? "button"}
            </button>
            {children && isOpen && (
                <div style={styleMenu} className={`menu menu-${position} ${menuClassName}`}>
                    <ul>
                        {children}
                    </ul>
                </div>
            )}
        </div>
    );
}

DropDownMultilevel.Item = Item
DropDownMultilevel.Divider = Divider
DropDownMultilevel.SubMenu = SubMenu

export default DropDownMultilevel

export interface DropdownProps extends SharedProps {
    title?: React.ReactNode,
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    isActive?: boolean,
    isDisabled?: boolean,
    position?: 'left' | 'right' | 'top-right' | 'top-left',
    wrapperClassName?: string,
    buttonClassName?: string,
    menuClassName?: string,
    buttonVariant?: 'primary' | 'secondary' | 'tertiary' | 'special' | 'special-success' | 'dashed',
    openOnHover?: boolean,
    isDropDown?:boolean
    styleMenu?:CSSProperties
}