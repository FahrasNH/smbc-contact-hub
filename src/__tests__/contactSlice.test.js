import { describe, it, expect, vi, beforeEach } from "vitest";
import contactReducer, {
  fetchContacts,
  addContact,
  updateContact,
  deleteContact,
  setSearchQuery,
  selectFilteredContacts,
} from "../features/contacts/store/contactSlice.js";

vi.mock("../features/contacts/api/contactRepository.js", () => ({
  getAll: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  remove: vi.fn(),
}));

import * as contactRepository from "../features/contacts/api/contactRepository.js";

const sampleContact = {
  id: 1,
  firstName: "Leanne",
  lastName: "Graham",
  email: "a@b.com",
  phone: "123",
  company: "Acme",
  city: "City",
};

describe("contactSlice", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetchContacts fulfilled stores items", () => {
    const state = contactReducer(
      undefined,
      fetchContacts.fulfilled([sampleContact], "", undefined),
    );
    expect(state.items).toHaveLength(1);
    expect(state.status).toBe("succeeded");
  });

  it("fetchContacts rejected sets error", () => {
    const state = contactReducer(
      undefined,
      fetchContacts.rejected(new Error("fail"), "req-1", undefined, "Network error"),
    );
    expect(state.status).toBe("failed");
    expect(state.error).toBe("Network error");
  });

  it("addContact fulfilled appends item", () => {
    const initial = { items: [], status: "succeeded", error: null, searchQuery: "", editingContact: null, deleteCandidate: null, formOpen: false };
    const state = contactReducer(initial, addContact.fulfilled(sampleContact, "", undefined));
    expect(state.items).toHaveLength(1);
    expect(state.formOpen).toBe(false);
  });

  it("updateContact fulfilled replaces item", () => {
    const initial = { items: [sampleContact], status: "succeeded", error: null, searchQuery: "", editingContact: sampleContact, deleteCandidate: null, formOpen: true };
    const updated = { ...sampleContact, firstName: "Updated" };
    const state = contactReducer(initial, updateContact.fulfilled(updated, "", undefined));
    expect(state.items[0].firstName).toBe("Updated");
  });

  it("deleteContact fulfilled removes item", () => {
    const initial = { items: [sampleContact], status: "succeeded", error: null, searchQuery: "", editingContact: null, deleteCandidate: sampleContact, formOpen: false };
    const state = contactReducer(initial, deleteContact.fulfilled(1, "", undefined));
    expect(state.items).toHaveLength(0);
    expect(state.deleteCandidate).toBeNull();
  });

  it("setSearchQuery updates query", () => {
    const state = contactReducer(undefined, setSearchQuery("leanne"));
    expect(state.searchQuery).toBe("leanne");
  });

  it("selectFilteredContacts filters by search", () => {
    const rootState = {
      contacts: {
        items: [sampleContact, { ...sampleContact, id: 2, firstName: "Other", email: "z@z.com" }],
        searchQuery: "leanne",
      },
    };
    const filtered = selectFilteredContacts(rootState);
    expect(filtered).toHaveLength(1);
    expect(filtered[0].firstName).toBe("Leanne");
  });
});
