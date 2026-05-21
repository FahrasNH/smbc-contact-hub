import { httpClient } from "../httpClient.js";

export async function fetchAllContacts() {
  const response = await httpClient.get("/contact");
  return response.data;
}

export async function createContact(contact) {
  const response = await httpClient.post("/contact", contact);
  return response.data;
}

export async function updateContact(contact) {
  const response = await httpClient.put(`/contact/${contact.id}`, contact);
  return response.data;
}

export async function removeContact(contactId) {
  await httpClient.delete(`/contact/${contactId}`);
  return contactId;
}
