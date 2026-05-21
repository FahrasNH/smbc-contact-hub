import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactList } from "../features/contacts/components/ContactList.jsx";

const contact = {
  id: 1,
  firstName: "A",
  lastName: "B",
  email: "a@b.com",
  phone: "1",
  company: "Co",
  city: "X",
};

describe("ContactList", () => {
  it("shows skeleton when loading", () => {
    render(
      <ContactList contacts={[]} status="loading" error={null} searchQuery="" onEdit={vi.fn()} onDelete={vi.fn()} onRetry={vi.fn()} />,
    );
    expect(screen.getByLabelText("Loading contacts")).toBeInTheDocument();
  });

  it("shows error with retry", async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();
    render(
      <ContactList contacts={[]} status="failed" error="Boom" searchQuery="" onEdit={vi.fn()} onDelete={vi.fn()} onRetry={onRetry} />,
    );
    expect(screen.getByText("Boom")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Try again" }));
    expect(onRetry).toHaveBeenCalled();
  });

  it("shows empty state", () => {
    render(
      <ContactList contacts={[]} status="succeeded" error={null} searchQuery="" onEdit={vi.fn()} onDelete={vi.fn()} onRetry={vi.fn()} />,
    );
    expect(screen.getByText(/No contacts yet/)).toBeInTheDocument();
  });

  it("renders contacts", () => {
    render(
      <ContactList contacts={[contact]} status="succeeded" error={null} searchQuery="" onEdit={vi.fn()} onDelete={vi.fn()} onRetry={vi.fn()} />,
    );
    expect(screen.getByText("A B")).toBeInTheDocument();
  });
});
