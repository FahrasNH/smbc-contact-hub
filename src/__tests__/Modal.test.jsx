import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Modal } from "../shared/components/Modal.jsx";

describe("Modal", () => {
  it("renders when open", () => {
    render(
      <Modal open title="Title" onClose={vi.fn()}>
        <p>Body</p>
      </Modal>,
    );
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
  });

  it("returns null when closed", () => {
    const { container } = render(
      <Modal open={false} title="Title" onClose={vi.fn()}>
        <p>Body</p>
      </Modal>,
    );
    expect(container.firstChild).toBeNull();
  });
});
