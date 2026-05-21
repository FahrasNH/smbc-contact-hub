import { describe, it, expect, vi, beforeEach } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import contactReducer, {
  fetchContacts,
  addContact,
  updateContact,
  deleteContact,
} from "../features/contacts/store/contactSlice.js";

vi.mock("../features/contacts/api/contactRepository.js", () => ({
  getAll: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  remove: vi.fn(),
}));

import * as contactRepository from "../features/contacts/api/contactRepository.js";

const sample = {
  id: 1,
  firstName: "A",
  lastName: "B",
  email: "a@b.com",
  phone: "1",
  company: "",
  city: "",
};

function makeStore() {
  return configureStore({ reducer: { contacts: contactReducer } });
}

describe("contactSlice async", () => {
  beforeEach(() => vi.clearAllMocks());

  it("fetchContacts loads data", async () => {
    contactRepository.getAll.mockResolvedValue([sample]);
    const store = makeStore();
    await store.dispatch(fetchContacts());
    expect(store.getState().contacts.items).toHaveLength(1);
    expect(store.getState().contacts.status).toBe("succeeded");
  });

  it("fetchContacts handles error", async () => {
    contactRepository.getAll.mockRejectedValue(new Error("fail"));
    const store = makeStore();
    await store.dispatch(fetchContacts());
    expect(store.getState().contacts.status).toBe("failed");
  });

  it("addContact adds item", async () => {
    contactRepository.create.mockResolvedValue({ ...sample, id: 2 });
    const store = makeStore();
    await store.dispatch(addContact(sample));
    expect(store.getState().contacts.items.some((c) => c.id === 2)).toBe(true);
  });

  it("updateContact updates item", async () => {
    contactRepository.getAll.mockResolvedValue([sample]);
    contactRepository.update.mockResolvedValue({ ...sample, firstName: "Z" });
    const store = makeStore();
    await store.dispatch(fetchContacts());
    await store.dispatch(updateContact({ ...sample, firstName: "Z" }));
    expect(store.getState().contacts.items[0].firstName).toBe("Z");
  });

  it("deleteContact removes item", async () => {
    contactRepository.getAll.mockResolvedValue([sample]);
    contactRepository.remove.mockResolvedValue(1);
    const store = makeStore();
    await store.dispatch(fetchContacts());
    await store.dispatch(deleteContact(1));
    expect(store.getState().contacts.items).toHaveLength(0);
  });
});
