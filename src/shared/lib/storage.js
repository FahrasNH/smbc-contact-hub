const STORAGE_KEY = "smbc-contact-mutations";

export function readMutations() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { created: [], updated: {}, deletedIds: [] };
    const parsed = JSON.parse(raw);
    return {
      created: Array.isArray(parsed.created) ? parsed.created : [],
      updated: parsed.updated && typeof parsed.updated === "object" ? parsed.updated : {},
      deletedIds: Array.isArray(parsed.deletedIds) ? parsed.deletedIds : [],
    };
  } catch {
    return { created: [], updated: {}, deletedIds: [] };
  }
}

export function writeMutations(mutations) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(mutations));
}

export function clearMutations() {
  localStorage.removeItem(STORAGE_KEY);
}
