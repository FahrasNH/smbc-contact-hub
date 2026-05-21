import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "../features/contacts/store/contactSlice.js";

export const store = configureStore({
  reducer: {
    contacts: contactReducer,
  },
});
