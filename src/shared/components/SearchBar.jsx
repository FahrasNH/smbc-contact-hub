import { SearchNormal } from "iconsax-react";

const inputClass =
  "h-11 w-full cursor-text rounded-full border border-neutral-200 bg-neutral-50 px-4 pl-11 text-base text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-200 focus:bg-white focus:outline-none focus:ring-0";

export function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="relative min-w-0 flex-1">
      <SearchNormal
        size={18}
        variant="Linear"
        color="currentColor"
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
        aria-hidden
      />
      <label htmlFor="contact-search" className="sr-only">
        Search contacts
      </label>
      <input
        id="contact-search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={inputClass}
        autoComplete="off"
      />
    </div>
  );
}
