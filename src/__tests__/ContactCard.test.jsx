import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactCard } from "../features/contacts/components/ContactCard.jsx";

const contact = {
  id: 1,
  firstName: "Leanne",
  lastName: "Graham",
  email: "leanne@example.com",
  phone: "555-0100",
  company: "Romaguera",
  city: "Gwenborough",
  updatedAt: "2026-05-21T10:00:00.000Z",
};

describe("ContactCard", () => {
  it("renders name and email", () => {
    render(<ContactCard contact={contact} onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText("Leanne Graham")).toBeInTheDocument();
    expect(screen.getAllByText("leanne@example.com").length).toBeGreaterThan(0);
    expect(screen.getByText("Last updated")).toBeInTheDocument();
  });

  it("calls onEdit and onDelete", async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    render(<ContactCard contact={contact} onEdit={onEdit} onDelete={onDelete} />);
    await user.click(screen.getByLabelText("Edit Leanne Graham"));
    await user.click(screen.getByLabelText("Delete Leanne Graham"));
    expect(onEdit).toHaveBeenCalledWith(contact);
    expect(onDelete).toHaveBeenCalledWith(contact);
  });
});
