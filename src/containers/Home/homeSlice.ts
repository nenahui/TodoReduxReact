import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import type { ApiTodo, ITodoState } from '../../types';

const initialState: ITodoState = {
  todos: [],
  isCreating: false,
  isLoading: false,
  isError: false,
};

export const createTodo = createAsyncThunk(
  'home/add',
  async (todo: ApiTodo) => {
    await axiosApi.post('todos.json', todo);
  }
);

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTodo.pending, (state) => {
        state.isError = false;
        state.isCreating = true;
      })
      .addCase(createTodo.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(createTodo.rejected, (state) => {
        state.isError = true;
        state.isCreating = false;
      });
  },
});

export const homeReducer = homeSlice.reducer;
