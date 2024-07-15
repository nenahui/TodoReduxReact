import { TodoForm } from '../../components/TodoForm/TodoForm';
import type { ApiTodo } from '../../types';

export const Home = () => {
  const onFormSubmit = (todo: ApiTodo) => {
    const data: ApiTodo = {
      ...todo,
      completed: false,
    };

    console.log(data);
  };

  return (
    <div className={'container'}>
      <TodoForm onSubmit={onFormSubmit} />
    </div>
  );
};
