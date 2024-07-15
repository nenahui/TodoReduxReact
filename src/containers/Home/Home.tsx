import { Typography } from 'antd';
import { TodoForm } from '../../components/TodoForm/TodoForm';

export const Home = () => {
  return (
    <div className={'container'}>
      <Typography.Text>Create a new todo task…</Typography.Text>
      <TodoForm />
    </div>
  );
};
