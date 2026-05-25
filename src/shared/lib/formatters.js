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

export function nowIsoTimestamp() {
  return new Date().toISOString();
}

export function formatLastUpdated(isoTimestamp) {
  if (!isoTimestamp) return "—";
  const date = new Date(isoTimestamp);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
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
