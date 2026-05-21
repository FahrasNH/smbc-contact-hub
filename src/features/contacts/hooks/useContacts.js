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
  selectDirectoryView,
  setSortMode,
  setCurrentPage,
} from "../store/contactSlice.js";

export function useContacts() {
  const dispatch = useDispatch();
  const contactsState = useSelector((state) => state.contacts);
  const filteredContacts = useSelector(selectFilteredContacts);
  const directoryView = useSelector(selectDirectoryView);

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
    directoryContacts: directoryView.contacts,
    totalCount: directoryView.totalCount,
    totalPages: directoryView.totalPages,
    currentPage: directoryView.currentPage,
    paginationItems: directoryView.paginationItems,
    loadContacts,
    createContact,
    editContact,
    removeContact,
    setSearchQuery: (q) => dispatch(setSearchQuery(q)),
    setSortMode: (mode) => dispatch(setSortMode(mode)),
    setCurrentPage: (page) => dispatch(setCurrentPage(page)),
    startEdit: (contact) => dispatch(setEditingContact(contact)),
    cancelForm: () => dispatch(clearEditingContact()),
    startCreate: () => dispatch(openCreateForm()),
    requestDelete: (contact) => dispatch(setDeleteCandidate(contact)),
    cancelDelete: () => dispatch(clearDeleteCandidate()),
  };
}
