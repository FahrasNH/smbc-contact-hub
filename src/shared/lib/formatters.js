export function splitFullName(fullName) {
  const trimmed = fullName.trim();
  if (!trimmed) return { firstName: "", lastName: "" };
  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) return { firstName: parts[0], lastName: "" };
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

export function joinFullName(firstName, lastName) {
  return [firstName, lastName].filter(Boolean).join(" ").trim();
}

export function buildSearchableContactText(contact) {
  return [
    contact.firstName,
    contact.lastName,
    contact.email,
    contact.phone,
    contact.company,
    contact.city,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}
