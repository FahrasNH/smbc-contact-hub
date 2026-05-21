import { describe, it, expect, vi, beforeEach } from "vitest";
import contactReducer, {
  fetchContacts,
  addContact,
  updateContact,
  deleteContact,
  setSearchQuery,
  setSortMode,
  setCurrentPage,
  selectFilteredContacts,
  selectDirectoryView,
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
    const initial = { items: [], status: "succeeded", error: null, searchQuery: "", sortMode: "updated-desc", currentPage: 1, editingContact: null, deleteCandidate: null, formOpen: false };
    const state = contactReducer(initial, addContact.fulfilled(sampleContact, "", undefined));
    expect(state.items).toHaveLength(1);
    expect(state.formOpen).toBe(false);
  });

  it("updateContact fulfilled replaces item", () => {
    const initial = { items: [sampleContact], status: "succeeded", error: null, searchQuery: "", sortMode: "updated-desc", currentPage: 1, editingContact: sampleContact, deleteCandidate: null, formOpen: true };
    const updated = { ...sampleContact, firstName: "Updated" };
    const state = contactReducer(initial, updateContact.fulfilled(updated, "", undefined));
    expect(state.items[0].firstName).toBe("Updated");
  });

  it("deleteContact fulfilled removes item", () => {
    const initial = { items: [sampleContact], status: "succeeded", error: null, searchQuery: "", sortMode: "updated-desc", currentPage: 1, editingContact: null, deleteCandidate: sampleContact, formOpen: false };
    const state = contactReducer(initial, deleteContact.fulfilled(1, "", undefined));
    expect(state.items).toHaveLength(0);
    expect(state.deleteCandidate).toBeNull();
  });

  it("setSearchQuery updates query and resets page", () => {
    const state = contactReducer(
      { searchQuery: "", currentPage: 3, sortOrder: "asc" },
      setSearchQuery("leanne"),
    );
    expect(state.searchQuery).toBe("leanne");
    expect(state.currentPage).toBe(1);
  });

  it("setSortMode updates mode and resets page", () => {
    const state = contactReducer(
      { searchQuery: "", currentPage: 2, sortMode: "name-asc" },
      setSortMode("updated-desc"),
    );
    expect(state.sortMode).toBe("updated-desc");
    expect(state.currentPage).toBe(1);
  });

  it("addContact fulfilled sorts by last updated and resets page", () => {
    const initial = {
      items: [{ ...sampleContact, updatedAt: "2020-01-01T00:00:00.000Z" }],
      status: "succeeded",
      error: null,
      searchQuery: "",
      sortMode: "name-asc",
      currentPage: 3,
      editingContact: null,
      deleteCandidate: null,
      formOpen: true,
    };
    const created = { ...sampleContact, id: 99, firstName: "New", updatedAt: "2026-05-21T12:00:00.000Z" };
    const state = contactReducer(initial, addContact.fulfilled(created, "", undefined));
    expect(state.sortMode).toBe("updated-desc");
    expect(state.currentPage).toBe(1);
  });

  it("selectDirectoryView paginates sorted contacts", () => {
    const items = Array.from({ length: 6 }, (_unused, index) => ({
      ...sampleContact,
      id: index + 1,
      firstName: `User${index}`,
    }));
    const rootState = {
      contacts: {
        items,
        searchQuery: "",
        sortMode: "name-asc",
        currentPage: 2,
      },
    };
    const view = selectDirectoryView(rootState);
    expect(view.contacts).toHaveLength(1);
    expect(view.totalPages).toBe(2);
    expect(view.currentPage).toBe(2);
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
