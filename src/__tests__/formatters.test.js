import { describe, it, expect } from "vitest";
import { splitFullName, joinFullName, buildSearchableContactText } from "../shared/lib/formatters.js";

describe("formatters", () => {
  it("splitFullName splits on first space", () => {
    expect(splitFullName("Jane Doe")).toEqual({ firstName: "Jane", lastName: "Doe" });
  });

  it("joinFullName joins parts", () => {
    expect(joinFullName("Jane", "Doe")).toBe("Jane Doe");
  });

  it("buildSearchableContactText lowercases fields", () => {
    const text = buildSearchableContactText({
      firstName: "Jane",
      lastName: "Doe",
      email: "J@X.COM",
      phone: "1",
      company: "Acme",
      city: "NY",
    });
    expect(text).toContain("jane");
    expect(text).toContain("j@x.com");
  });
});
