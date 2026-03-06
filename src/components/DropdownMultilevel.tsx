import { type CSSProperties, forwardRef, useImperativeHandle } from "react";
import Item, { type ItemProps } from "./Item";
import SubMenu, { type SubMenuProps } from "./SubMenu";
import Divider, { type DividerProps } from "./Divider";
import { useDropdown } from "../hooks/useDropdown";
import { type SharedProps, type DropdownHandle } from "@src/types/index.types";
import {buildClassName} from "@src/utility/utilis";

export interface DropdownProps extends SharedProps {
    title?: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onMouseOver?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onMouseLeave?: (event: React.MouseEvent<HTMLDivElement>) => void;
    onMouseEnter?: (event: React.MouseEvent<HTMLDivElement>) => void;
    onOpen?: () => void;
    onClose?: () => void;
    isMouseEvent?: boolean;
    disableOutsideClick?: boolean;
    isActive?: boolean;
    isDisabled?: boolean;
    position?: "left" | "right" | "top-right" | "top-left";
    wrapperClassName?: string;
    buttonClassName?: string;
    menuClassName?: string;
    buttonVariant?:
        | "primary"
        | "secondary"
        | "tertiary"
        | "special"
        | "special-success"
        | "dashed";
    openOnHover?: boolean;
    isDropDown?: boolean;
    hoverCloseDelay?: number;
    styleMenu?: CSSProperties;
}

// ─── Tipo composto: ForwardRef + proprietà statiche ───────────────────────────
type DropdownMultilevelType = React.ForwardRefExoticComponent<
    DropdownProps & React.RefAttributes<DropdownHandle>
> & {
    Item: React.FC<ItemProps>;
    Divider: React.FC<DividerProps>;
    SubMenu: React.FC<SubMenuProps>;
};

// ─── Componente ───────────────────────────────────────────────────────────────
const DropdownMultilevel = forwardRef<DropdownHandle, DropdownProps>(
    function DropdownMultilevel(props, ref) {
        const {
            title,
            children,
            isDisabled = false,
            position = "left",
            wrapperClassName = "",
            buttonClassName = "",
            menuClassName = "",
            disableOutsideClick = true,
            onClick,
            onMouseOver,
            onMouseLeave: onMouseLeaveProp,
            onMouseEnter: onMouseEnterProp,
            onOpen,
            onClose,
            isMouseEvent = true,
            isActive = false,
            buttonVariant = "secondary",
            openOnHover = false,
            className = "",
            isDropDown = true,
            style = {},
            styleMenu = {},
            hoverCloseDelay = 300,
        } = props;

        const {
            isOpen,
            dropdownRef,
            toggle,
            open,
            handleMouseEnter,
            handleMouseLeave,
        } = useDropdown({
            isDisabled,
            disableOutsideClick,
            openOnHover,
            hoverCloseDelay,
            onOpen,
            onClose,
        });

        useImperativeHandle(
            ref,
            () => ({
                dropdownRef,
                toggle: (e: React.MouseEvent<HTMLButtonElement>) => {
                    stopEventIfNeeded(e);
                    toggle();
                },
                isOpen,
            }),
            [dropdownRef, toggle, isOpen]
        );

        const stopEventIfNeeded = (e: React.MouseEvent) => {
            if (isMouseEvent) {
                e.preventDefault();
                e.stopPropagation();
            }
        };

        const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            stopEventIfNeeded(e);
            onClick?.(e);
            toggle();
        };

        const handleButtonMouseOver = (e: React.MouseEvent<HTMLButtonElement>) => {
            stopEventIfNeeded(e);
            onMouseOver?.(e);
            open();
        };

        const handleWrapperMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
            onMouseLeaveProp?.(e);
            handleMouseLeave();
        };

        const handleWrapperMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
            onMouseEnterProp?.(e);
            handleMouseEnter();
        };

        const buttonLabel = title ?? "button";
        const menuId = "dropdown-menu";

        return (
            <div
                ref={dropdownRef}
                style={style}
                className={buildClassName("dropdown", wrapperClassName, className)}
                onMouseLeave={handleWrapperMouseLeave}
                onMouseEnter={handleWrapperMouseEnter}
            >
                <button
                    type="button"
                    id="dropdown-button"
                    className={buildClassName(
                        "button",
                        buttonVariant,
                        isOpen || isActive ? "active" : "",
                        isDisabled ? "disabled" : "",
                        buttonClassName
                    )}
                    disabled={isDisabled}
                    tabIndex={isDisabled ? -1 : 0}
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    aria-controls={isDropDown && isOpen ? menuId : undefined}
                    onClick={!openOnHover ? handleButtonClick : undefined}
                    onMouseOver={openOnHover ? handleButtonMouseOver : undefined}
                >
                    {buttonLabel}
                </button>

                {isDropDown && children && isOpen && (
                    <div
                        id={menuId}
                        role="menu"
                        aria-labelledby="dropdown-button"
                        style={styleMenu}
                        className={buildClassName(
                            "menu",
                            `menu-${position}`,
                            menuClassName
                        )}
                    >
                        <ul role="presentation">{children}</ul>
                    </div>
                )}
            </div>
        );
    }
// ✅ Cast al tipo composto invece di lasciare il tipo inferito da forwardRef
) as DropdownMultilevelType;

DropdownMultilevel.displayName = "DropdownMultilevel";

// ✅ Ora TypeScript conosce queste proprietà grazie a DropdownMultilevelType
DropdownMultilevel.Item = Item;
DropdownMultilevel.Divider = Divider;
DropdownMultilevel.SubMenu = SubMenu;

export default DropdownMultilevel;



