import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../features/contacts/api/httpClient.js", () => ({
  httpClient: {
    get: vi.fn(),
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
} from "../features/contacts/api/adapters/randomUserAdapter.js";

const apiUser = {
  name: { title: "Miss", first: "Jennie", last: "Nichols" },
  email: "jennie.nichols@example.com",
  phone: "(272) 790-0888",
  location: { city: "Billings" },
  login: { uuid: "7a0eed16-9430-4d68-901f-c0d4c1c3bf00" },
  registered: { date: "2007-07-09T05:51:59.390Z" },
  picture: { medium: "https://randomuser.me/api/portraits/med/women/75.jpg" },
};

describe("randomUserAdapter", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    readMutations.mockReturnValue({ created: [], updated: {}, deletedIds: [] });
  });

  it("fetchAllContacts maps results array", async () => {
    httpClient.get.mockResolvedValue({ data: { results: [apiUser] } });
    const result = await fetchAllContacts();
    expect(result).toHaveLength(1);
    expect(result[0].firstName).toBe("Jennie");
    expect(result[0].id).toBe("7a0eed16-9430-4d68-901f-c0d4c1c3bf00");
  });

  it("fetchAllContacts filters deleted ids", async () => {
    httpClient.get.mockResolvedValue({ data: { results: [apiUser] } });
    readMutations.mockReturnValue({
      created: [],
      updated: {},
      deletedIds: ["7a0eed16-9430-4d68-901f-c0d4c1c3bf00"],
    });
    const result = await fetchAllContacts();
    expect(result).toHaveLength(0);
  });

  it("createContact stores in mutations without HTTP write", async () => {
    const created = await createContact({
      firstName: "New",
      lastName: "User",
      email: "n@u.com",
      phone: "9",
      company: "",
      city: "",
    });
    expect(created.firstName).toBe("New");
    expect(created.id).toMatch(/^local-/);
    expect(writeMutations).toHaveBeenCalled();
    expect(httpClient.get).not.toHaveBeenCalled();
  });

  it("updateContact patches existing contact in mutations", async () => {
    const updated = await updateContact({
      id: "7a0eed16-9430-4d68-901f-c0d4c1c3bf00",
      firstName: "Updated",
      lastName: "Name",
      email: "u@n.com",
      phone: "1",
      company: "",
      city: "",
    });
    expect(updated.firstName).toBe("Updated");
    expect(updated.updatedAt).toBeTruthy();
    expect(writeMutations).toHaveBeenCalled();
  });

  it("removeContact marks server contact as deleted", async () => {
    await removeContact("7a0eed16-9430-4d68-901f-c0d4c1c3bf00");
    const mutations = writeMutations.mock.calls[0][0];
    expect(mutations.deletedIds).toContain("7a0eed16-9430-4d68-901f-c0d4c1c3bf00");
  });

  it("removeContact deletes local-only contact without adding to deletedIds", async () => {
    readMutations.mockReturnValue({
      created: [{ id: "local-123", firstName: "Local" }],
      updated: {},
      deletedIds: [],
    });
    await removeContact("local-123");
    const mutations = writeMutations.mock.calls[0][0];
    expect(mutations.deletedIds).not.toContain("local-123");
    expect(mutations.created).toHaveLength(0);
  });
});
