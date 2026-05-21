import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ContactTopNav } from "./ContactTopNav.jsx";
import { ContactToolbar } from "../features/contacts/components/ContactToolbar.jsx";
import { ContactList } from "../features/contacts/components/ContactList.jsx";
import { ContactForm } from "../features/contacts/components/ContactForm.jsx";
import { Modal } from "../shared/components/Modal.jsx";
import { useContacts } from "../features/contacts/hooks/useContacts.js";
import { joinFullName } from "../shared/lib/formatters.js";
import {
  addContact,
  updateContact,
  deleteContact,
} from "../features/contacts/store/contactSlice.js";

export default function App() {
  const {
    status,
    error,
    searchQuery,
    filteredContacts,
    editingContact,
    deleteCandidate,
    formOpen,
    loadContacts,
    createContact,
    editContact,
    removeContact,
    setSearchQuery,
    startEdit,
    cancelForm,
    startCreate,
    requestDelete,
    cancelDelete,
  } = useContacts();

  const [formSubmitting, setFormSubmitting] = useState(false);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  const handleFormSubmit = async (formData) => {
    const payload = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      company: formData.company?.trim() ?? "",
      city: formData.city?.trim() ?? "",
    };

    setFormSubmitting(true);
    try {
      if (editingContact?.id) {
        const result = await editContact({ ...payload, id: editingContact.id });
        if (updateContact.fulfilled.match(result)) {
          toast.success("Contact updated");
        } else {
          toast.error(result.payload || "Update failed");
        }
      } else {
        const result = await createContact(payload);
        if (addContact.fulfilled.match(result)) {
          toast.success("Contact added");
        } else {
          toast.error(result.payload || "Create failed");
        }
      }
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteCandidate) return;
    const name = joinFullName(deleteCandidate.firstName, deleteCandidate.lastName);
    const result = await removeContact(deleteCandidate.id);
    if (deleteContact.fulfilled.match(result)) {
      toast.success(`${name} removed`);
    } else {
      toast.error(result.payload || "Delete failed");
    }
  };

  return (
    <div className="flex min-h-full flex-col bg-ds-background font-sans text-ds-on-surface">
      <ContactTopNav />
      <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 shrink-0">
            <h1 className="text-[1.75rem] font-bold leading-tight tracking-[-0.02em] text-ds-on-surface sm:text-4xl">
              Contact Directory
            </h1>
            <p className="mt-2 max-w-2xl text-base leading-relaxed text-ds-muted">
              Manage your team contacts in one place.
            </p>
          </div>
          <div className="flex min-w-0 w-full lg:max-w-xl">
            <ContactToolbar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onAddClick={startCreate}
            />
          </div>
        </div>
        <div className="mt-8">
          <ContactList
            contacts={filteredContacts}
            status={status}
            error={error}
            searchQuery={searchQuery}
            onEdit={startEdit}
            onDelete={requestDelete}
            onRetry={loadContacts}
          />
        </div>
      </main>
      {formOpen && (
        <ContactForm
          contact={editingContact}
          onSubmit={handleFormSubmit}
          onCancel={cancelForm}
          isSubmitting={formSubmitting}
        />
      )}
      <Modal
        open={Boolean(deleteCandidate)}
        title="Delete contact?"
        onClose={cancelDelete}
      >
        <p className="text-sm text-neutral-600">
          {deleteCandidate
            ? `Remove ${joinFullName(deleteCandidate.firstName, deleteCandidate.lastName)}? This cannot be undone.`
            : ""}
        </p>
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            className="h-11 flex-1 rounded-full bg-neutral-100 text-sm font-semibold text-neutral-800 hover:bg-neutral-200"
            onClick={cancelDelete}
          >
            Cancel
          </button>
          <button
            type="button"
            className="h-11 flex-1 rounded-full bg-red-600 text-sm font-semibold text-white hover:bg-red-700"
            onClick={handleConfirmDelete}
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}
