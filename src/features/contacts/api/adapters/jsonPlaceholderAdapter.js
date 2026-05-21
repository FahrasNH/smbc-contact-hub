import { httpClient } from "../httpClient.js";
import { mapUserToContact, mapContactToUserPayload } from "../../model/contactMapper.js";
import { readMutations, writeMutations } from "../../../../shared/lib/storage.js";

function mergeContacts(baseContacts, mutations) {
  const deletedSet = new Set(mutations.deletedIds);
  const merged = baseContacts
    .filter((contact) => !deletedSet.has(contact.id))
    .map((contact) => mutations.updated[contact.id] ?? contact);

  return [...merged, ...mutations.created];
}

function nextLocalId(baseContacts, mutations) {
  const allIds = [
    ...baseContacts.map((c) => c.id),
    ...mutations.created.map((c) => c.id),
  ];
  return allIds.length === 0 ? 10001 : Math.max(...allIds) + 1;
}

export async function fetchAllContacts() {
  const response = await httpClient.get("/users");
  const base = response.data.map(mapUserToContact);
  const mutations = readMutations();
  return mergeContacts(base, mutations);
}

export async function createContact(contactInput) {
  const mutations = readMutations();
  const response = await httpClient.post("/users", mapContactToUserPayload(contactInput));
  const baseResponse = await httpClient.get("/users");
  const base = baseResponse.data.map(mapUserToContact);
  const newId = nextLocalId(base, mutations);
  const newContact = {
    id: newId,
    firstName: contactInput.firstName,
    lastName: contactInput.lastName,
    email: contactInput.email,
    phone: contactInput.phone,
    company: contactInput.company ?? "",
    city: contactInput.city ?? "",
  };
  mutations.created.push(newContact);
  writeMutations(mutations);
  return newContact;
}

export async function updateContact(contact) {
  await httpClient.put(`/users/${contact.id}`, mapContactToUserPayload(contact));
  const mutations = readMutations();
  const isLocalOnly = mutations.created.some((c) => c.id === contact.id);
  if (isLocalOnly) {
    mutations.created = mutations.created.map((c) =>
      c.id === contact.id ? { ...contact } : c,
    );
  } else {
    mutations.updated[contact.id] = { ...contact };
  }
  writeMutations(mutations);
  return contact;
}

export async function removeContact(contactId) {
  await httpClient.delete(`/users/${contactId}`);
  const mutations = readMutations();
  const wasLocal = mutations.created.some((c) => c.id === contactId);
  mutations.created = mutations.created.filter((c) => c.id !== contactId);
  delete mutations.updated[contactId];
  if (!wasLocal && !mutations.deletedIds.includes(contactId)) {
    mutations.deletedIds.push(contactId);
  }
  writeMutations(mutations);
  return contactId;
}
