import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchBar } from "../shared/components/SearchBar.jsx";

describe("SearchBar", () => {
  it("calls onChange when typing", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<SearchBar value="" onChange={onChange} placeholder="Search" />);
    await user.type(screen.getByRole("searchbox"), "a");
    expect(onChange).toHaveBeenCalled();
  });
});
