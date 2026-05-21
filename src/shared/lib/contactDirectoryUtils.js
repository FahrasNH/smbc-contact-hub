import { joinFullName } from "./formatters.js";

export const CONTACT_DIRECTORY_PAGE_SIZE = 5;

export function sortContactsByName(contacts, order) {
  const sorted = [...contacts].sort((contactA, contactB) => {
    const nameA = joinFullName(contactA.firstName, contactA.lastName);
    const nameB = joinFullName(contactB.firstName, contactB.lastName);
    return nameA.localeCompare(nameB, "en", { sensitivity: "base" });
  });
  return order === "desc" ? sorted.reverse() : sorted;
}

export function sortContactsByUpdated(contacts, order) {
  const sorted = [...contacts].sort((contactA, contactB) => {
    const timeA = new Date(contactA.updatedAt ?? 0).getTime();
    const timeB = new Date(contactB.updatedAt ?? 0).getTime();
    return timeA - timeB;
  });
  return order === "desc" ? sorted.reverse() : sorted;
}

export function sortContacts(contacts, sortMode) {
  if (sortMode === "name-desc") return sortContactsByName(contacts, "desc");
  if (sortMode === "name-asc") return sortContactsByName(contacts, "asc");
  if (sortMode === "updated-asc") return sortContactsByUpdated(contacts, "asc");
  return sortContactsByUpdated(contacts, "desc");
}

export function visiblePageNumbers(totalPages, currentPage) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_unused, pageIndex) => pageIndex + 1);
  }
  const pageNumbers = new Set([1, totalPages]);
  for (let offset = -2; offset <= 2; offset += 1) {
    const neighborPage = currentPage + offset;
    if (neighborPage >= 1 && neighborPage <= totalPages) {
      pageNumbers.add(neighborPage);
    }
  }
  const sortedPages = [...pageNumbers].sort((left, right) => left - right);
  const result = [];
  for (let index = 0; index < sortedPages.length; index += 1) {
    const pageNumber = sortedPages[index];
    const previousPageNumber = sortedPages[index - 1];
    if (index > 0 && previousPageNumber !== undefined && pageNumber - previousPageNumber > 1) {
      result.push("ellipsis");
    }
    result.push(pageNumber);
  }
  return result;
}
