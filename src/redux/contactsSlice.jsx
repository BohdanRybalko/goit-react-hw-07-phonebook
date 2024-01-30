import { createSlice, createAsyncThunk, createAction, createSelector } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchContacts = createAsyncThunk('fetchAll', async () => {
  const response = await axios.get('https://65b4f3d841db5efd28671d26.mockapi.io/contacts');
  return response.data;
});

export const addContact = createAsyncThunk('addContact', async (contact) => {
  const response = await axios.post('https://65b4f3d841db5efd28671d26.mockapi.io/contacts', contact);
  return response.data;
});

export const deleteContact = createAsyncThunk('deleteContact', async (id) => {
  await axios.delete(`https://65b4f3d841db5efd28671d26.mockapi.io/contacts/${id}`);
  return id;
});

export const setFilter = createAction('setFilter');

export const selectContacts = (state) => state.items;
export const selectFilter = (state) => state.filter;
export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    filter: '',
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter((contact) => contact.id !== action.payload);
      });
  },
});

export default contactsSlice.reducer;
