import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../features/contacts/api/httpClient.js", () => ({
  httpClient: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

vi.mock("../shared/lib/storage.js", () => ({
  readMutations: vi.fn(() => ({ created: [], updated: {}, deletedIds: [] })),
  writeMutations: vi.fn(),
}));

import { httpClient } from "../features/contacts/api/httpClient.js";
import { readMutations, writeMutations } from "../shared/lib/storage.js";
import {
  fetchAllContacts,
  createContact,
  updateContact,
  removeContact,
} from "../features/contacts/api/adapters/jsonPlaceholderAdapter.js";

const apiUser = {
  id: 1,
  name: "Leanne Graham",
  email: "a@b.com",
  phone: "123",
  company: { name: "Acme" },
  address: { city: "Gwenborough" },
};

describe("jsonPlaceholderAdapter", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    readMutations.mockReturnValue({ created: [], updated: {}, deletedIds: [] });
  });

  it("fetchAllContacts merges api users", async () => {
    httpClient.get.mockResolvedValue({ data: [apiUser] });
    const result = await fetchAllContacts();
    expect(result).toHaveLength(1);
    expect(result[0].firstName).toBe("Leanne");
  });

  it("createContact writes to storage", async () => {
    httpClient.post.mockResolvedValue({ data: { id: 11 } });
    httpClient.get.mockResolvedValue({ data: [apiUser] });
    const created = await createContact({
      firstName: "New",
      lastName: "User",
      email: "n@u.com",
      phone: "9",
      company: "",
      city: "",
    });
    expect(created.firstName).toBe("New");
    expect(writeMutations).toHaveBeenCalled();
  });

  it("updateContact updates storage for existing user", async () => {
    httpClient.put.mockResolvedValue({ data: {} });
    const updated = await updateContact({
      id: 1,
      firstName: "X",
      lastName: "Y",
      email: "x@y.com",
      phone: "1",
      company: "",
      city: "",
    });
    expect(updated.firstName).toBe("X");
    expect(writeMutations).toHaveBeenCalled();
  });

  it("removeContact marks deleted", async () => {
    httpClient.delete.mockResolvedValue({});
    await removeContact(1);
    expect(writeMutations).toHaveBeenCalled();
  });
});
