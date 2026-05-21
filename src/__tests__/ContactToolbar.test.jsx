import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactToolbar } from "../features/contacts/components/ContactToolbar.jsx";

describe("ContactToolbar", () => {
  it("fires onAddClick", async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<ContactToolbar searchQuery="" onSearchChange={vi.fn()} onAddClick={onAdd} />);
    await user.click(screen.getByRole("button", { name: /Add Contact/i }));
    expect(onAdd).toHaveBeenCalled();
  });
});
