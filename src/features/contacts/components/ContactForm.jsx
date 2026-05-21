import { useEffect, useState } from "react";
import { CloseCircle } from "iconsax-react";
import { createEmptyContact } from "../model/contactShape.js";
import { joinFullName } from "../../../shared/lib/formatters.js";

const inputClass =
  "h-11 w-full rounded-full border border-neutral-200 bg-neutral-50 px-4 text-base text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-200 focus:bg-white focus:outline-none focus:ring-0";

export function ContactForm({ contact, onSubmit, onCancel, isSubmitting }) {
  const [form, setForm] = useState(createEmptyContact());

  useEffect(() => {
    if (contact) {
      setForm({ ...contact });
    } else {
      setForm(createEmptyContact());
    }
  }, [contact]);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const isEdit = Boolean(contact?.id);

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/40 p-4 sm:items-center">
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-neutral-200 bg-white p-6 shadow-lg"
        role="dialog"
        aria-labelledby="contact-form-title"
      >
        <div className="flex items-center justify-between">
          <h2 id="contact-form-title" className="text-lg font-bold text-neutral-900">
            {isEdit ? "Edit Contact" : "Add Contact"}
          </h2>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 hover:bg-neutral-50"
            aria-label="Close form"
            onClick={onCancel}
          >
            <CloseCircle size={20} variant="Linear" color="currentColor" aria-hidden />
          </button>
        </div>
        <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="mb-1 block text-sm font-medium text-neutral-700">
                First name
              </label>
              <input
                id="firstName"
                required
                value={form.firstName}
                onChange={handleChange("firstName")}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="lastName" className="mb-1 block text-sm font-medium text-neutral-700">
                Last name
              </label>
              <input
                id="lastName"
                value={form.lastName}
                onChange={handleChange("lastName")}
                className={inputClass}
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-neutral-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange("email")}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="phone" className="mb-1 block text-sm font-medium text-neutral-700">
              Phone
            </label>
            <input
              id="phone"
              required
              value={form.phone}
              onChange={handleChange("phone")}
              className={inputClass}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="company" className="mb-1 block text-sm font-medium text-neutral-700">
                Company
              </label>
              <input
                id="company"
                value={form.company}
                onChange={handleChange("company")}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="city" className="mb-1 block text-sm font-medium text-neutral-700">
                City
              </label>
              <input
                id="city"
                value={form.city}
                onChange={handleChange("city")}
                className={inputClass}
              />
            </div>
          </div>
          <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              className="h-11 rounded-full bg-neutral-100 px-6 text-sm font-semibold text-neutral-800 transition-colors hover:bg-neutral-200"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="h-11 rounded-full bg-ds-primary px-6 text-sm font-semibold text-ds-on-primary shadow-sm transition-opacity hover:opacity-95 disabled:opacity-50"
            >
              {isSubmitting ? "Saving…" : isEdit ? "Save changes" : "Add contact"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
