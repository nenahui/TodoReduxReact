export interface ITodo {
  id: string;
  title: string;
  completed: boolean;
}

export type ApiTodo = Omit<ITodo, 'id'>;

export interface ITodoState {
  todos: ITodo[];
  isLoading: boolean;
  isError: boolean;
  isCreating: boolean;
}
