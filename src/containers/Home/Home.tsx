import { Flex, Space, Typography } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
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
            <AnimatePresence>
              {todos.map((todo, index) => (
                <motion.div
                  key={todo.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <TodoItem key={todo.id} todo={todo} />
                </motion.div>
              ))}
            </AnimatePresence>
          </Flex>
        </Space>
      </Flex>
    </div>
  );
};
