import { useEffect, useRef, useState } from "react";
import { Sort, UserAdd } from "iconsax-react";
import { SearchBar } from "../../../shared/components/SearchBar.jsx";

const iconBtn =
  "flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition-colors hover:border-neutral-300 hover:bg-neutral-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ds-primary/40";

const sortOptions = [
  { value: "updated-desc", label: "Last updated (newest)" },
  { value: "updated-asc", label: "Last updated (oldest)" },
  { value: "name-asc", label: "Name A → Z" },
  { value: "name-desc", label: "Name Z → A" },
];

export function ContactToolbar({
  searchQuery,
  onSearchChange,
  sortMode,
  onSortChange,
  onAddClick,
}) {
  const [sortOpen, setSortOpen] = useState(false);
  const rootRef = useRef(null);
  const sortIsActive = sortMode !== "name-asc";

  useEffect(() => {
    if (!sortOpen) return;
    const handleDocumentMouseDown = (mouseEvent) => {
      if (rootRef.current?.contains(mouseEvent.target)) return;
      setSortOpen(false);
    };
    document.addEventListener("mousedown", handleDocumentMouseDown);
    return () => document.removeEventListener("mousedown", handleDocumentMouseDown);
  }, [sortOpen]);

  return (
    <div
      ref={rootRef}
      className="flex min-w-0 w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-end"
    >
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <div className="min-w-0 flex-1">
          <SearchBar
            value={searchQuery}
            onChange={onSearchChange}
            placeholder="Search name, email, phone…"
          />
        </div>
        <div className="relative shrink-0">
          <button
            type="button"
            className={`${iconBtn} ${sortOpen || sortIsActive ? "border-ds-primary/40 bg-ds-primary/5 text-ds-primary" : ""}`}
            aria-expanded={sortOpen}
            aria-haspopup="listbox"
            aria-label="Sort contacts"
            onClick={() => setSortOpen((isOpen) => !isOpen)}
          >
            <Sort size={18} variant="Linear" color="currentColor" className="shrink-0" aria-hidden />
          </button>
          {sortOpen && (
            <ul
              className="absolute right-0 top-[calc(100%+0.5rem)] z-50 min-w-[14rem] rounded-xl border border-neutral-200 bg-white py-1 shadow-lg"
              role="listbox"
              aria-label="Sort options"
            >
              {sortOptions.map((option) => (
                <li key={option.value}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={sortMode === option.value}
                    className="flex w-full cursor-pointer items-center px-4 py-2.5 text-left text-sm text-neutral-800 hover:bg-neutral-50 aria-selected:bg-ds-primary/5 aria-selected:text-ds-primary"
                    onClick={() => {
                      onSortChange(option.value);
                      setSortOpen(false);
                    }}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <button
        type="button"
        className="inline-flex h-11 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full bg-ds-primary px-6 text-sm font-semibold text-ds-on-primary shadow-sm transition-opacity hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ds-primary"
        onClick={onAddClick}
      >
        <UserAdd size={18} variant="Linear" color="currentColor" className="shrink-0" aria-hidden />
        Add Contact
      </button>
    </div>
  );
}
