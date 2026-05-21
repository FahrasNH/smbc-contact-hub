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

const listProps = {
  contacts: [],
  status: "succeeded",
  error: null,
  searchQuery: "",
  totalCount: 0,
  currentPage: 1,
  totalPages: 1,
  paginationItems: [1],
  onEdit: vi.fn(),
  onDelete: vi.fn(),
  onRetry: vi.fn(),
  onPageChange: vi.fn(),
};

describe("ContactList", () => {
  it("shows skeleton when loading", () => {
    render(<ContactList {...listProps} status="loading" />);
    expect(screen.getByLabelText("Loading contacts")).toBeInTheDocument();
  });

  it("shows error with retry", async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();
    render(<ContactList {...listProps} status="failed" error="Boom" onRetry={onRetry} />);
    expect(screen.getByText("Boom")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Try again" }));
    expect(onRetry).toHaveBeenCalled();
  });

  it("shows empty state", () => {
    render(<ContactList {...listProps} />);
    expect(screen.getByText(/No contacts yet/)).toBeInTheDocument();
  });

  it("renders contacts", () => {
    render(
      <ContactList
        {...listProps}
        contacts={[contact]}
        totalCount={1}
      />,
    );
    expect(screen.getByText("A B")).toBeInTheDocument();
  });

  it("renders pagination when multiple pages", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(
      <ContactList
        {...listProps}
        contacts={[contact]}
        totalCount={10}
        totalPages={2}
        paginationItems={[1, 2]}
        onPageChange={onPageChange}
      />,
    );
    await user.click(screen.getByRole("button", { name: "Page 2" }));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });
});
