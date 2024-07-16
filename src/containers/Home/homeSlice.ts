import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import type { ApiTodo, IApiTodos, ITodo, ITodoState } from '../../types';

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
  async (todo: ITodo) => {
    await axiosApi.put(`todos/${todo.id}.json`, {
      ...todo,
      completed: !todo.completed,
    });
  }
);

export const deleteTodo = createAsyncThunk(
  'home/delete',
  async (todo: ITodo) => {
    await axiosApi.delete(`todos/${todo.id}.json`);
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
      })
      .addCase(
        fetchTodos.fulfilled,
        (state, action: PayloadAction<ITodo[]>) => {
          state.todos = action.payload;
        }
      );
  },
});

export const homeReducer = homeSlice.reducer;
