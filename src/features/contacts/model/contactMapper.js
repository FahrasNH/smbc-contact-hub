import { splitFullName, seedUpdatedAtFromId } from "../../../shared/lib/formatters.js";

export function mapUserToContact(user) {
  const { firstName, lastName } = splitFullName(user.name ?? "");
  return {
    id: user.id,
    firstName,
    lastName,
    email: user.email ?? "",
    phone: user.phone ?? "",
    company: user.company?.name ?? "",
    city: user.address?.city ?? "",
    updatedAt: seedUpdatedAtFromId(user.id),
  };
}

export function mapContactToUserPayload(contact) {
  const name = [contact.firstName, contact.lastName].filter(Boolean).join(" ");
  return {
    name,
    email: contact.email,
    phone: contact.phone,
    username: contact.email?.split("@")[0] ?? "user",
    website: "example.com",
    company: { name: contact.company || "—" },
    address: {
      street: "—",
      suite: "—",
      city: contact.city || "—",
      zipcode: "00000",
      geo: { lat: "0", lng: "0" },
    },
  };
}
