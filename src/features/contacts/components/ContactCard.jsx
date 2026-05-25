import { Edit2, Trash } from "iconsax-react";
import { joinFullName, formatLastUpdated } from "../../../shared/lib/formatters.js";
import { initialsFromName, avatarBackgroundStyle } from "../../../shared/lib/avatarUtils.js";

function StatCell({ label, children }) {
  return (
    <div className="min-w-0">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-400">{label}</p>
      <div className="mt-1 text-sm font-semibold text-neutral-900">{children}</div>
    </div>
  );
}

export function ContactCard({ contact, onEdit, onDelete, priority = false }) {
  const fullName = joinFullName(contact.firstName, contact.lastName);

  return (
    <li className="flex flex-col rounded-[2.5rem] bg-white p-8 shadow-[0_4px_28px_rgba(15,23,42,0.07)]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          {contact.picture ? (
            <img
              className="h-12 w-12 shrink-0 rounded-full object-cover sm:h-14 sm:w-14"
              src={contact.picture}
              alt={fullName}
              loading={priority ? "eager" : "lazy"}
              decoding="async"
              fetchpriority={priority ? "high" : "auto"}
            />
          ) : (
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-xs font-bold text-neutral-700 sm:h-14 sm:w-14 sm:text-sm"
              style={avatarBackgroundStyle(contact.id)}
              aria-hidden
            >
              {initialsFromName(contact.firstName, contact.lastName)}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-bold tracking-tight text-neutral-900 sm:text-lg">{fullName}</h3>
            <p className="mt-1 truncate text-sm text-neutral-500">
              {contact.company && (
                <>
                  <span className="text-neutral-600">{contact.company}</span>
                  <span className="mx-1.5 text-neutral-300" aria-hidden>
                    •
                  </span>
                </>
              )}
              <a className="text-ds-primary hover:underline" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </p>
          </div>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition-colors hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ds-primary"
            aria-label={`Edit ${fullName}`}
            onClick={() => onEdit(contact)}
          >
            <Edit2 size={18} variant="Linear" color="currentColor" aria-hidden />
          </button>
          <button
            type="button"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-red-200 bg-red-50 text-red-600 transition-colors hover:bg-red-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
            aria-label={`Delete ${fullName}`}
            onClick={() => onDelete(contact)}
          >
            <Trash size={18} variant="Linear" color="currentColor" aria-hidden />
          </button>
        </div>
      </div>
      <div className="mt-6 border-t border-neutral-100 pt-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCell label="Phone">{contact.phone}</StatCell>
          <StatCell label="City">{contact.city || "—"}</StatCell>
          <StatCell label="Email">
            <a className="text-ds-primary hover:underline" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
          </StatCell>
          <StatCell label="Company">{contact.company || "—"}</StatCell>
        </div>
        <div className="mt-4 border-t border-neutral-100 pt-4">
          <StatCell label="Last updated">{formatLastUpdated(contact.updatedAt)}</StatCell>
        </div>
      </div>
    </li>
  );
}
