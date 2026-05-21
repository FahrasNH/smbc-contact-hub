import { describe, it, expect } from "vitest";
import {
  sortContactsByName,
  sortContactsByUpdated,
  sortContacts,
  visiblePageNumbers,
  CONTACT_DIRECTORY_PAGE_SIZE,
} from "../shared/lib/contactDirectoryUtils.js";

describe("contactDirectoryUtils", () => {
  const contacts = [
    { id: 1, firstName: "Zara", lastName: "Lee", email: "", phone: "", company: "", city: "", updatedAt: "2024-01-03T00:00:00.000Z" },
    { id: 2, firstName: "Anna", lastName: "Kay", email: "", phone: "", company: "", city: "", updatedAt: "2024-01-01T00:00:00.000Z" },
    { id: 3, firstName: "Mike", lastName: "Bo", email: "", phone: "", company: "", city: "", updatedAt: "2026-05-21T00:00:00.000Z" },
  ];

  it("sortContactsByName ascending", () => {
    const sorted = sortContactsByName(contacts, "asc");
    expect(sorted[0].firstName).toBe("Anna");
    expect(sorted[2].firstName).toBe("Zara");
  });

  it("sortContactsByName descending", () => {
    const sorted = sortContactsByName(contacts, "desc");
    expect(sorted[0].firstName).toBe("Zara");
    expect(sorted[2].firstName).toBe("Anna");
  });

  it("sortContactsByUpdated puts newest first when desc", () => {
    const sorted = sortContactsByUpdated(contacts, "desc");
    expect(sorted[0].firstName).toBe("Mike");
  });

  it("sortContacts uses updated-desc by default branch", () => {
    const sorted = sortContacts(contacts, "updated-desc");
    expect(sorted[0].firstName).toBe("Mike");
  });

  it("visiblePageNumbers returns ellipsis for large page counts", () => {
    const pages = visiblePageNumbers(10, 5);
    expect(pages).toContain("ellipsis");
    expect(pages[0]).toBe(1);
    expect(pages[pages.length - 1]).toBe(10);
  });

  it("exports page size constant", () => {
    expect(CONTACT_DIRECTORY_PAGE_SIZE).toBe(5);
  });
});
