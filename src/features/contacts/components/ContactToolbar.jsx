import { UserAdd } from "iconsax-react";
import { SearchBar } from "../../../shared/components/SearchBar.jsx";

export function ContactToolbar({ searchQuery, onSearchChange, onAddClick }) {
  return (
    <div className="flex min-w-0 w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
      <SearchBar
        value={searchQuery}
        onChange={onSearchChange}
        placeholder="Search name, email, phone…"
      />
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
