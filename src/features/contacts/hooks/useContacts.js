import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchContacts,
  addContact,
  updateContact,
  deleteContact,
  setSearchQuery,
  setEditingContact,
  clearEditingContact,
  openCreateForm,
  setDeleteCandidate,
  clearDeleteCandidate,
  selectFilteredContacts,
} from "../store/contactSlice.js";

export function useContacts() {
  const dispatch = useDispatch();
  const contactsState = useSelector((state) => state.contacts);
  const filteredContacts = useSelector(selectFilteredContacts);

  const loadContacts = useCallback(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const createContact = useCallback(
    (payload) => dispatch(addContact(payload)),
    [dispatch],
  );

  const editContact = useCallback(
    (payload) => dispatch(updateContact(payload)),
    [dispatch],
  );

  const removeContact = useCallback(
    (id) => dispatch(deleteContact(id)),
    [dispatch],
  );

  return {
    ...contactsState,
    filteredContacts,
    loadContacts,
    createContact,
    editContact,
    removeContact,
    setSearchQuery: (q) => dispatch(setSearchQuery(q)),
    startEdit: (contact) => dispatch(setEditingContact(contact)),
    cancelForm: () => dispatch(clearEditingContact()),
    startCreate: () => dispatch(openCreateForm()),
    requestDelete: (contact) => dispatch(setDeleteCandidate(contact)),
    cancelDelete: () => dispatch(clearDeleteCandidate()),
  };
}
