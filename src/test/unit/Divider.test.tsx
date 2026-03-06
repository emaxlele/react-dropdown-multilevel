import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import DropdownMultilevel from "@root/src";

describe("Divider", () => {
    it("ha role=separator", () => {
        render(<ul><DropdownMultilevel.Divider /></ul>);
        expect(screen.getByRole("separator", { hidden: true })).toBeInTheDocument();
    });

    it("classe 'sm' di default", () => {
        render(<ul><DropdownMultilevel.Divider /></ul>);
        expect(screen.getByRole("separator", { hidden: true })).toHaveClass("sm");
    });

    it("classe 'lg' se size='lg'", () => {
        render(<ul><DropdownMultilevel.Divider size="lg" /></ul>);
        expect(screen.getByRole("separator", { hidden: true })).toHaveClass("lg");
    });

    it("aria-hidden se non c'è label", () => {
        render(<ul><DropdownMultilevel.Divider /></ul>);
        expect(screen.getByRole("separator", { hidden: true }))
            .toHaveAttribute("aria-hidden", "true");
    });

    it("aria-label se fornita", () => {
        render(<ul><DropdownMultilevel.Divider label="Sezione" /></ul>);
        expect(screen.getByRole("separator", { hidden: true }))
            .toHaveAttribute("aria-label", "Sezione");
    });
});

