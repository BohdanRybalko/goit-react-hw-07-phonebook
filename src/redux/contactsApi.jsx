import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://65b4f3d841db5efd28671d26.mockapi.io/contacts/contacts',
});

export const fetchContacts = createAsyncThunk('fetchAll', async () => {
  try {
    const response = await axiosInstance.get();
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
});

export const addContact = createAsyncThunk('addContact', async (contact) => {
  try {
    const response = await axiosInstance.post('', contact);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
});

export const deleteContact = createAsyncThunk('deleteContact', async (id) => {
  try {
    await axiosInstance.delete(`/${id}`);
    return id;
  } catch (error) {
    return Promise.reject(error);
  }
});
