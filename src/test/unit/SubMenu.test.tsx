import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DropdownMultilevel from "@root/src";

describe("SubMenu", () => {
	it("renderizza il trigger (title)", () => {
		render(
			<DropdownMultilevel.SubMenu title="Apri">
				<DropdownMultilevel.Item>Sub Voce</DropdownMultilevel.Item>
			</DropdownMultilevel.SubMenu>
		);
		expect(screen.getByText("Apri")).toBeInTheDocument();
	});

	it("il pannello non è montato finché chiuso", () => {
		render(<DropdownMultilevel.SubMenu title="Apri" />);
		expect(screen.queryByRole("menu")).not.toBeInTheDocument();
	});

	it("apre il pannello al passaggio del mouse", async () => {
		render(
			<DropdownMultilevel.SubMenu title="Apri">
				<DropdownMultilevel.Item>Sub Voce</DropdownMultilevel.Item>
			</DropdownMultilevel.SubMenu>
		);
		await userEvent.hover(screen.getByText("Apri"));
		expect(screen.getByRole("menu")).toBeInTheDocument();
		expect(screen.getByText("Sub Voce")).toBeInTheDocument();
	});

	it("apre il pannello con Enter da tastiera", async () => {
		render(<DropdownMultilevel.SubMenu title="Apri" />);
		const trigger = screen.getByRole("menuitem");
		trigger.focus();
		await userEvent.keyboard("{Enter}");
		expect(screen.getByRole("menu")).toBeInTheDocument();
	});

	it("usa la posizione 'right' di default", async () => {
		render(<DropdownMultilevel.SubMenu title="Apri" />);
		await userEvent.hover(screen.getByText("Apri"));
		expect(screen.getByRole("menu")).toHaveClass("submenu-right");
	});

	it("applica la posizione richiesta", async () => {
		render(<DropdownMultilevel.SubMenu title="Apri" position="left" />);
		await userEvent.hover(screen.getByText("Apri"));
		expect(screen.getByRole("menu")).toHaveClass("submenu-left");
	});

	it("applica aria-label al pannello", async () => {
		render(<DropdownMultilevel.SubMenu title="Apri" label="Sottomenu" />);
		await userEvent.hover(screen.getByText("Apri"));
		expect(screen.getByRole("menu")).toHaveAttribute(
			"aria-label",
			"Sottomenu"
		);
	});
});
