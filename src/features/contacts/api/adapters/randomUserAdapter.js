import { httpClient } from "../httpClient.js";
import { mapRandomUserToContact } from "../../model/contactMapper.js";
import { readMutations, writeMutations } from "../../../../shared/lib/storage.js";
import { nowIsoTimestamp } from "../../../../shared/lib/formatters.js";

function mergeContacts(baseContacts, mutations) {
  const deletedSet = new Set(mutations.deletedIds);
  const merged = baseContacts
    .filter((contact) => !deletedSet.has(contact.id))
    .map((contact) => mutations.updated[contact.id] ?? contact);
  return [...merged, ...mutations.created];
}

function nextLocalId(mutations) {
  return `local-${Date.now()}-${mutations.created.length}`;
}

export async function fetchAllContacts() {
  const response = await httpClient.get("/api/?results=30&seed=smbc-hub");
  const base = response.data.results.map(mapRandomUserToContact);
  const mutations = readMutations();
  return mergeContacts(base, mutations);
}

export async function createContact(contactInput) {
  const mutations = readMutations();
  const newContact = {
    id: nextLocalId(mutations),
    firstName: contactInput.firstName,
    lastName: contactInput.lastName,
    email: contactInput.email,
    phone: contactInput.phone,
    company: contactInput.company ?? "",
    city: contactInput.city ?? "",
    picture: contactInput.picture ?? "",
    updatedAt: nowIsoTimestamp(),
  };
  mutations.created.push(newContact);
  writeMutations(mutations);
  return newContact;
}

export async function updateContact(contact) {
  const mutations = readMutations();
  const isLocalOnly = mutations.created.some((c) => c.id === contact.id);
  const updatedContact = { ...contact, updatedAt: nowIsoTimestamp() };
  if (isLocalOnly) {
    mutations.created = mutations.created.map((c) =>
      c.id === contact.id ? updatedContact : c,
    );
  } else {
    mutations.updated[contact.id] = updatedContact;
  }
  writeMutations(mutations);
  return updatedContact;
}

export async function removeContact(contactId) {
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
