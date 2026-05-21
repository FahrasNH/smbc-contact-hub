import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SkeletonLoader } from "../shared/components/SkeletonLoader.jsx";

describe("SkeletonLoader", () => {
  it("renders loading region", () => {
    render(<SkeletonLoader />);
    expect(screen.getByLabelText("Loading contacts")).toBeInTheDocument();
  });
});
