import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "../features/contacts/components/ContactForm.jsx";

describe("ContactForm", () => {
  it("updates input values", async () => {
    const user = userEvent.setup();
    render(
      <ContactForm contact={null} onSubmit={vi.fn()} onCancel={vi.fn()} isSubmitting={false} />,
    );
    const firstName = screen.getByLabelText("First name");
    await user.type(firstName, "Jane");
    expect(firstName).toHaveValue("Jane");
  });

  it("submits form data", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(
      <ContactForm contact={null} onSubmit={onSubmit} onCancel={vi.fn()} isSubmitting={false} />,
    );
    await user.type(screen.getByLabelText("First name"), "Jane");
    await user.type(screen.getByLabelText("Email"), "jane@test.com");
    await user.type(screen.getByLabelText("Phone"), "555");
    await user.click(screen.getByRole("button", { name: "Add contact" }));
    expect(onSubmit).toHaveBeenCalled();
  });
});
