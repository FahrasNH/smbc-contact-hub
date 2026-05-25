import { ContactCard } from "./ContactCard.jsx";
import { ContactPagination } from "./ContactPagination.jsx";
import { SkeletonLoader } from "../../../shared/components/SkeletonLoader.jsx";
import { EmptyState } from "../../../shared/components/EmptyState.jsx";

export function ContactList({
  contacts,
  status,
  error,
  searchQuery,
  totalCount,
  currentPage,
  totalPages,
  paginationItems,
  onEdit,
  onDelete,
  onRetry,
  onPageChange,
}) {
  if (status === "loading") {
    return <SkeletonLoader />;
  }

  if (status === "failed") {
    return (
      <div
        className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-900 shadow-sm"
        role="alert"
      >
        <p className="font-semibold">Could not load contacts</p>
        <p className="mt-1 text-sm opacity-90">{error}</p>
        <button
          type="button"
          className="mt-4 h-11 cursor-pointer rounded-full bg-red-600 px-6 text-sm font-semibold text-white hover:bg-red-700"
          onClick={onRetry}
        >
          Try again
        </button>
      </div>
    );
  }

  if (totalCount === 0) {
    const message = searchQuery.trim()
      ? "No contacts match your search."
      : "No contacts yet. Add your first contact.";
    return <EmptyState message={message} />;
  }

  return (
    <div className="flex flex-col gap-8">
      <ul className="flex list-none flex-col gap-8 p-0" role="region" aria-label="Contact directory">
        {contacts.map((contact, index) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onEdit={onEdit}
            onDelete={onDelete}
            priority={index === 0}
          />
        ))}
      </ul>
      <ContactPagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginationItems={paginationItems}
        onPageChange={onPageChange}
      />
    </div>
  );
}
