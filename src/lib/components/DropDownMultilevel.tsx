import React, {
    useState, useRef, useEffect, useCallback, CSSProperties,
} from 'react';
import Item from "./Item";
import SubMenu from "./SubMenu";
import Divider from "./Divider";
import {SharedProps} from "../types/index.types";

function DropDownMultilevel (props:DropdownProps) {
    const {
        title, children, isDisabled = false,
        position = 'left', wrapperClassName = "",
        buttonClassName = "", menuClassName = "", disableOutsideClick = true, onClick = () => null,
        onMouseOver = () => null, onMouseLeave = () => null, onMouseEnter = () => null,
        isMouseEvent = true, isActive = false, buttonVariant = 'secondary',
        openOnHover = false, className = "", isDropDown = true, style = {},
        styleMenu = {}
    } = props
    const [isOpen, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    let timeoutId:NodeJS.Timeout | null = null;

    useEffect(() => () => {
        document.removeEventListener('mousedown', handleClick);
    }, []);

    const handleClick = useCallback((e: MouseEvent) => {
        if (disableOutsideClick && (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))) {
            setOpen(false);
            document.removeEventListener('mousedown', handleClick);
        }
    }, []);

    const handleMouseEvent = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (isMouseEvent && e) {
            e.preventDefault();
            e.stopPropagation();
        }
    }
    const handleButtonOn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (isDisabled) return;
        setOpen(!isOpen);
        if (isOpen) {
            document.removeEventListener('mousedown', handleClick);
        } else {
            document.addEventListener('mousedown', handleClick);
        }
    };

    const handleButtonOnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        handleMouseEvent(e)
        onClick(e)
        handleButtonOn(e)
    };

    const handleButtonOnMouseOver = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        handleMouseEvent(e)
        onMouseOver(e)
        handleButtonOn(e)
    };


    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        handleMouseEvent(e)
        onMouseLeave(e)
        if (isDisabled) return;
        timeoutId = setTimeout(() => {
            setOpen(false);
            document.removeEventListener('mousedown', handleClick);
        }, 500)
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        handleMouseEvent(e)
        onMouseEnter(e)
        if (isDisabled) return;
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
    };

    return (
        <div
            ref={dropdownRef}
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
                onMouseOver={openOnHover ? handleButtonOnMouseOver : undefined}
            >
                {(!children || title ? title : children) ?? "button"}
            </button>
            {isDropDown && children && isOpen && (
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
    onMouseOver?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    onMouseLeave?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
    onMouseEnter?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
    isMouseEvent?: boolean,
    disableOutsideClick?: boolean,
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