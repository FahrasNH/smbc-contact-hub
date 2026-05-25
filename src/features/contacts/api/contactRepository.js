import * as randomUserAdapter from "./adapters/randomUserAdapter.js";
import * as herokuAdapter from "./adapters/herokuAdapter.js";

const provider = import.meta.env.VITE_API_PROVIDER || "randomuser";

function getAdapter() {
  if (provider === "heroku") return herokuAdapter;
  return randomUserAdapter;
}

export function getAll() {
  return getAdapter().fetchAllContacts();
}

export function create(contact) {
  return getAdapter().createContact(contact);
}

export function update(contact) {
  return getAdapter().updateContact(contact);
}

export function remove(contactId) {
  return getAdapter().removeContact(contactId);
}
