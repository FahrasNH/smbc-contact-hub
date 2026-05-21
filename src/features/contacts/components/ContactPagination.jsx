import { ArrowLeft2, ArrowRight2 } from "iconsax-react";

export function ContactPagination({
  currentPage,
  totalPages,
  paginationItems,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 flex items-center justify-center">
      <nav className="flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
        <button
          type="button"
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-35"
          aria-label="Previous page"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ArrowLeft2 size={16} variant="Linear" color="currentColor" aria-hidden />
        </button>
        {paginationItems.map((pageToken, paginationIndex) =>
          pageToken === "ellipsis" ? (
            <span
              key={`ellipsis-${paginationIndex}`}
              className="flex h-10 w-10 items-center justify-center text-sm text-neutral-400"
            >
              …
            </span>
          ) : (
            <button
              key={pageToken}
              type="button"
              className={
                pageToken === currentPage
                  ? "flex h-10 min-w-10 cursor-pointer items-center justify-center rounded-full bg-ds-primary px-3 text-sm font-semibold text-white"
                  : "flex h-10 min-w-10 cursor-pointer items-center justify-center rounded-full border border-neutral-200 bg-white px-3 text-sm font-medium text-neutral-600 hover:bg-neutral-50"
              }
              aria-current={pageToken === currentPage ? "page" : undefined}
              aria-label={`Page ${pageToken}`}
              onClick={() => onPageChange(pageToken)}
            >
              {pageToken}
            </button>
          ),
        )}
        <button
          type="button"
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-35"
          aria-label="Next page"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <ArrowRight2 size={16} variant="Linear" color="currentColor" aria-hidden />
        </button>
      </nav>
    </div>
  );
}
