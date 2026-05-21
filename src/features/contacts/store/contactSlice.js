import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as contactRepository from "../api/contactRepository.js";
import { buildSearchableContactText } from "../../../shared/lib/formatters.js";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async (_, { rejectWithValue }) => {
    try {
      return await contactRepository.getAll();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contactInput, { rejectWithValue }) => {
    try {
      return await contactRepository.create(contactInput);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async (contact, { rejectWithValue }) => {
    try {
      return await contactRepository.update(contact);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, { rejectWithValue }) => {
    try {
      await contactRepository.remove(contactId);
      return contactId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  items: [],
  status: "idle",
  error: null,
  searchQuery: "",
  editingContact: null,
  deleteCandidate: null,
  formOpen: false,
};

const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setEditingContact(state, action) {
      state.editingContact = action.payload;
      state.formOpen = true;
    },
    clearEditingContact(state) {
      state.editingContact = null;
      state.formOpen = false;
    },
    openCreateForm(state) {
      state.editingContact = null;
      state.formOpen = true;
    },
    setDeleteCandidate(state, action) {
      state.deleteCandidate = action.payload;
    },
    clearDeleteCandidate(state) {
      state.deleteCandidate = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.formOpen = false;
        state.editingContact = null;
      })
      .addCase(addContact.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        const index = state.items.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
        state.formOpen = false;
        state.editingContact = null;
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter((c) => c.id !== action.payload);
        state.deleteCandidate = null;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const {
  setSearchQuery,
  setEditingContact,
  clearEditingContact,
  openCreateForm,
  setDeleteCandidate,
  clearDeleteCandidate,
} = contactSlice.actions;

export function selectFilteredContacts(state) {
  const query = state.contacts.searchQuery.trim().toLowerCase();
  if (!query) return state.contacts.items;
  return state.contacts.items.filter((contact) =>
    buildSearchableContactText(contact).includes(query),
  );
}

export default contactSlice.reducer;
