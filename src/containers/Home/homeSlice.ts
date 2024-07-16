import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import type { ApiTodo, IApiTodos, ITodo, ITodoState } from '../../types';
import { message } from 'antd';

const initialState: ITodoState = {
  todos: [],
  isCreating: false,
  isLoading: false,
};

export const createTodo = createAsyncThunk(
  'home/add',
  async (todo: ApiTodo, { dispatch }) => {
    await axiosApi.post('todos.json', todo);
    dispatch(fetchTodos());
  }
);

export const fetchTodos = createAsyncThunk('home/fetch', async () => {
  const { data: todosResponse } = await axiosApi.get<IApiTodos | null>(
    'todos.json'
  );
  if (todosResponse !== null) {
    return Object.keys(todosResponse).map((id) => ({
      ...todosResponse[id],
      id,
    }));
  } else {
    return [];
  }
});

export const updateTodo = createAsyncThunk(
  'home/update',
  async (todo: ITodo, { dispatch }) => {
    await axiosApi.put(`todos/${todo.id}.json`, {
      ...todo,
      completed: !todo.completed,
    });
    dispatch(fetchTodos());
  }
);

export const deleteTodo = createAsyncThunk(
  'home/delete',
  async (todo: ITodo, { dispatch }) => {
    await axiosApi.delete(`todos/${todo.id}.json`);
    dispatch(fetchTodos());
  }
);

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTodo.pending, (state) => {
        state.isCreating = true;
      })
      .addCase(fetchTodos.pending, (state) => {
        if (state.todos.length <= 0) {
          state.isLoading = true;
        }
      })
      .addCase(createTodo.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(
        fetchTodos.fulfilled,
        (state, action: PayloadAction<ITodo[]>) => {
          state.todos = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(fetchTodos.rejected, () => {
        message.error('An error has occurred');
      })
      .addCase(updateTodo.rejected, () => {
        message.error('An error has occurred');
      })
      .addCase(deleteTodo.rejected, () => {
        message.error('An error has occurred');
      })
      .addCase(createTodo.rejected, (state) => {
        state.isCreating = false;
        message.error('An error has occurred');
      });
  },
});

export const homeReducer = homeSlice.reducer;
