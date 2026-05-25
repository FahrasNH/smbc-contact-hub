import { describe, it, expect, vi } from "vitest";

vi.mock("../features/contacts/api/adapters/randomUserAdapter.js", () => ({
  fetchAllContacts: vi.fn(() => Promise.resolve([])),
  createContact: vi.fn(),
  updateContact: vi.fn(),
  removeContact: vi.fn(),
}));

import * as randomUserAdapter from "../features/contacts/api/adapters/randomUserAdapter.js";
import * as contactRepository from "../features/contacts/api/contactRepository.js";

describe("contactRepository", () => {
  it("getAll delegates to randomUser adapter by default", async () => {
    await contactRepository.getAll();
    expect(randomUserAdapter.fetchAllContacts).toHaveBeenCalled();
  });
});
