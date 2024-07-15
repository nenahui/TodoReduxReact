import { Flex, Space, Typography } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../app/store';
import { TodoForm } from '../../components/TodoForm/TodoForm';
import { TodoItem } from '../../components/TodoItem/TodoItem';
import { fetchTodos } from './homeSlice';

export const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.home.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div className={'container'}>
      <Flex gap={'large'} vertical>
        <Space direction={'vertical'} size={'small'}>
          <Typography.Text>Create a new todo task…</Typography.Text>
          <TodoForm />
        </Space>

        <Space direction={'vertical'} size={'small'}>
          <Typography.Text>Todo list</Typography.Text>
          <Flex gap={'middle'} vertical>
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </Flex>
        </Space>
      </Flex>
    </div>
  );
};
