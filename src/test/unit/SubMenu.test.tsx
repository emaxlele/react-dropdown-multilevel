import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import DropdownMultilevel from "@root/src";

describe("SubMenu", () => {
    it("renderizza i children", () => {
        render(
            <DropdownMultilevel.SubMenu>
                <DropdownMultilevel.Item>Sub Voce</DropdownMultilevel.Item>
            </DropdownMultilevel.SubMenu>
        );
        expect(screen.getByText("Sub Voce")).toBeInTheDocument();
    });

    it("ha role=menu", () => {
        render(<DropdownMultilevel.SubMenu />);
        expect(screen.getByRole("menu")).toBeInTheDocument();
    });

    it("posizione 'left' di default", () => {
        render(<DropdownMultilevel.SubMenu />);
        expect(screen.getByRole("menu")).toHaveClass("left");
    });

    it("applica la posizione corretta", () => {
        render(<DropdownMultilevel.SubMenu position="right" />);
        expect(screen.getByRole("menu")).toHaveClass("right");
    });

    it("applica aria-label", () => {
        render(<DropdownMultilevel.SubMenu label="Sottomenu" />);
        expect(screen.getByRole("menu")).toHaveAttribute("aria-label", "Sottomenu");
    });
});

