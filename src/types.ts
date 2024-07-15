export interface ITodo {
  id: string;
  title: string;
  completed: boolean;
}

export type ApiTodo = Omit<ITodo, 'id'>;
