import { describe, it, expect, vi } from "vitest";

vi.mock("../features/contacts/api/adapters/jsonPlaceholderAdapter.js", () => ({
  fetchAllContacts: vi.fn(() => Promise.resolve([])),
  createContact: vi.fn(),
  updateContact: vi.fn(),
  removeContact: vi.fn(),
}));

import * as jsonPlaceholderAdapter from "../features/contacts/api/adapters/jsonPlaceholderAdapter.js";
import * as contactRepository from "../features/contacts/api/contactRepository.js";

describe("contactRepository", () => {
  it("getAll delegates to adapter", async () => {
    await contactRepository.getAll();
    expect(jsonPlaceholderAdapter.fetchAllContacts).toHaveBeenCalled();
  });
});
