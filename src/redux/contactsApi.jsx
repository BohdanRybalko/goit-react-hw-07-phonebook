import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://65b4f3d841db5efd28671d26.mockapi.io/contacts/contacts',
});

export const fetchContacts = createAsyncThunk('fetchAll', async (_, thunkApi) => {
  try {
    const response = await axiosInstance.get();
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const addContact = createAsyncThunk('addContact', async (contact, thunkApi) => {
  try {
    const response = await axiosInstance.post('', contact);
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const deleteContact = createAsyncThunk('deleteContact', async (id, thunkApi) => {
  try {
    await axiosInstance.delete(`/${id}`);
    return id;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});
