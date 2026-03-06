import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DropdownMultilevel from "@root/src";

function renderItem(props: Partial<React.ComponentProps<typeof DropdownMultilevel.Item>> = {}) {
    return render(
        <ul>
            <DropdownMultilevel.Item {...props}>
                {props.children ?? "Voce Test"}
            </DropdownMultilevel.Item>
        </ul>
    );
}

describe("Item", () => {
    it("renderizza il children", () => {
        renderItem({ children: "Ciao" });
        expect(screen.getByText("Ciao")).toBeInTheDocument();
    });

    it("renderizza title al posto di children", () => {
        renderItem({ title: <span>Titolo</span>, children: "Children" });
        expect(screen.getByText("Titolo")).toBeInTheDocument();
        expect(screen.queryByText("Children")).not.toBeInTheDocument();
    });

    it("chiama onClick se non disabilitato", async () => {
        const onClick = vi.fn();
        renderItem({ onClick });
        await userEvent.click(screen.getByRole("menuitem"));
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("non chiama onClick se disabilitato", async () => {
        const onClick = vi.fn();
        renderItem({ onClick, isDisabled: true });
        await userEvent.click(screen.getByRole("menuitem"));
        expect(onClick).not.toHaveBeenCalled();
    });

    it("attiva click con Enter", async () => {
        const onClick = vi.fn();
        renderItem({ onClick });
        screen.getByRole("menuitem").focus();
        await userEvent.keyboard("{Enter}");
        expect(onClick).toHaveBeenCalled();
    });

    it("attiva click con Space", async () => {
        const onClick = vi.fn();
        renderItem({ onClick });
        screen.getByRole("menuitem").focus();
        await userEvent.keyboard(" ");
        expect(onClick).toHaveBeenCalled();
    });

    it("ha aria-disabled=true se disabilitato", () => {
        renderItem({ isDisabled: true });
        expect(screen.getByRole("menuitem")).toHaveAttribute("aria-disabled", "true");
    });

    it("applica la classe active", () => {
        renderItem({ isActive: true });
        expect(screen.getByRole("menuitem")).toHaveClass("active");
    });

    it("chiama onMouseEnter con children", () => {
        const onMouseEnter = vi.fn();
        renderItem({ onMouseEnter, children: "Voce" });
        fireEvent.mouseEnter(screen.getByRole("menuitem"));
        expect(onMouseEnter).toHaveBeenCalledWith(expect.anything(), "Voce");
    });

    it("renderizza l'icona", () => {
        renderItem({ icon: <span data-testid="icona">🔧</span> });
        expect(screen.getByTestId("icona")).toBeInTheDocument();
    });
});

