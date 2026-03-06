import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import DropdownMultilevel, { type DropdownHandle } from "@root/src";

// ─── Helper ───────────────────────────────────────────────────────────────────

function renderDropdown(props: Partial<React.ComponentProps<typeof DropdownMultilevel>> = {}) {
    return render(
        <DropdownMultilevel title="Menu Test" {...props}>
            <DropdownMultilevel.Item>Voce 1</DropdownMultilevel.Item>
            <DropdownMultilevel.Item>Voce 2</DropdownMultilevel.Item>
            <DropdownMultilevel.Divider />
            <DropdownMultilevel.Item isDisabled>Disabilitata</DropdownMultilevel.Item>
        </DropdownMultilevel>
    );
}

// ─── Test ─────────────────────────────────────────────────────────────────────

describe("DropdownMultilevel", () => {

    describe("Rendering", () => {
        it("renderizza il bottone con il titolo", () => {
            renderDropdown({ title: "Ciao" });
            expect(screen.getByRole("button", { name: "Ciao" })).toBeInTheDocument();
        });

        it("renderizza 'button' come testo di default", () => {
            render(<DropdownMultilevel />);
            expect(screen.getByRole("button", { name: "button" })).toBeInTheDocument();
        });

        it("non renderizza il menu inizialmente", () => {
            renderDropdown();
            expect(screen.queryByRole("menu")).not.toBeInTheDocument();
        });

        it("applica wrapperClassName", () => {
            const { container } = renderDropdown({ wrapperClassName: "mia-classe" });
            expect(container.firstChild).toHaveClass("mia-classe");
        });

        it("applica buttonVariant", () => {
            renderDropdown({ buttonVariant: "primary" });
            expect(screen.getByRole("button")).toHaveClass("primary");
        });
    });

    describe("Apertura e chiusura", () => {
        it("apre il menu al click", async () => {
            renderDropdown();
            await userEvent.click(screen.getByRole("button"));
            expect(screen.getByRole("menu")).toBeInTheDocument();
        });

        it("chiude il menu al secondo click", async () => {
            renderDropdown();
            const btn = screen.getByRole("button");
            await userEvent.click(btn);
            await userEvent.click(btn);
            expect(screen.queryByRole("menu")).not.toBeInTheDocument();
        });

        it("chiude il menu al click esterno", async () => {
            renderDropdown();
            await userEvent.click(screen.getByRole("button"));
            await userEvent.click(document.body);
            expect(screen.queryByRole("menu")).not.toBeInTheDocument();
        });

        it("non chiude al click esterno se disableOutsideClick=false", async () => {
            renderDropdown({ disableOutsideClick: false });
            await userEvent.click(screen.getByRole("button"));
            await userEvent.click(document.body);
            expect(screen.getByRole("menu")).toBeInTheDocument();
        });
    });

    describe("Stato disabilitato", () => {
        it("non apre il menu", async () => {
            renderDropdown({ isDisabled: true });
            await userEvent.click(screen.getByRole("button"));
            expect(screen.queryByRole("menu")).not.toBeInTheDocument();
        });

        it("il bottone ha attributo disabled", () => {
            renderDropdown({ isDisabled: true });
            expect(screen.getByRole("button")).toBeDisabled();
        });
    });

    describe("Hover", () => {
        it("apre al mouseover se openOnHover=true", () => {
            renderDropdown({ openOnHover: true });
            fireEvent.mouseOver(screen.getByRole("button"));
            expect(screen.getByRole("menu")).toBeInTheDocument();
        });

        it("chiude dopo il delay quando il mouse esce", async () => {
            vi.useFakeTimers();
            renderDropdown({ openOnHover: true, hoverCloseDelay: 300 });
            fireEvent.mouseOver(screen.getByRole("button"));
            fireEvent.mouseLeave(screen.getByRole("button").parentElement!);

            await act(async () => { vi.advanceTimersByTime(300); });

            expect(screen.queryByRole("menu")).not.toBeInTheDocument();
            vi.useRealTimers();
        });
    });

    describe("Callbacks", () => {
        it("chiama onOpen all'apertura", async () => {
            const onOpen = vi.fn();
            renderDropdown({ onOpen });
            await userEvent.click(screen.getByRole("button"));
            expect(onOpen).toHaveBeenCalledTimes(1);
        });

        it("chiama onClose alla chiusura", async () => {
            const onClose = vi.fn();
            renderDropdown({ onClose });
            const btn = screen.getByRole("button");
            await userEvent.click(btn);
            await userEvent.click(btn);
            expect(onClose).toHaveBeenCalledTimes(1);
        });

        it("chiama onClick al click", async () => {
            const onClick = vi.fn();
            renderDropdown({ onClick });
            await userEvent.click(screen.getByRole("button"));
            expect(onClick).toHaveBeenCalledTimes(1);
        });
    });

    describe("Accessibilità", () => {
        it("aria-expanded=false quando chiuso", () => {
            renderDropdown();
            expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "false");
        });

        it("aria-expanded=true quando aperto", async () => {
            renderDropdown();
            await userEvent.click(screen.getByRole("button"));
            expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true");
        });

        it("aria-haspopup=true", () => {
            renderDropdown();
            expect(screen.getByRole("button")).toHaveAttribute("aria-haspopup", "true");
        });
    });

    describe("forwardRef", () => {
        it("espone isOpen", async () => {
            const ref = createRef<DropdownHandle>();
            render(
                <DropdownMultilevel ref={ref} title="Ref">
                    <DropdownMultilevel.Item>Voce</DropdownMultilevel.Item>
                </DropdownMultilevel>
            );
            expect(ref.current?.isOpen).toBe(false);
            await userEvent.click(screen.getByRole("button"));
            expect(ref.current?.isOpen).toBe(true);
        });

        it("espone dropdownRef al nodo DOM", () => {
            const ref = createRef<DropdownHandle>();
            const { container } = render(
                <DropdownMultilevel ref={ref} title="Ref">
                    <DropdownMultilevel.Item>Voce</DropdownMultilevel.Item>
                </DropdownMultilevel>
            );
            expect(ref.current?.dropdownRef.current).toBe(container.firstChild);
        });
    });
});

