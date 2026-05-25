import * as randomUserAdapter from "./adapters/randomUserAdapter.js";

function getAdapter() {
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
