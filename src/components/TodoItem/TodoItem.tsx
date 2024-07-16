import { DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { Button, Card, Checkbox, Flex, Popconfirm, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../app/store';
import { deleteTodo, updateTodo } from '../../containers/Home/homeSlice';
import type { ITodo } from '../../types';
const { Title } = Typography;

interface IProps {
  todo: ITodo;
}

export const TodoItem: React.FC<IProps> = ({ todo }) => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <Card>
      <Flex justify={'space-between'} align={'center'}>
        <Flex vertical>
          <Title level={5} style={{ margin: 0, fontWeight: 500 }}>
            {todo.title}
          </Title>
        </Flex>
        <Flex vertical align={'center'} gap={'small'}>
          <Checkbox
            onChange={() => dispatch(updateTodo(todo))}
            checked={todo.completed}
          />
          <Popconfirm
            title='Delete the task'
            description='Are you sure to delete this task?'
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={() => dispatch(deleteTodo(todo))}
          >
            <Button icon={<DeleteOutlined />} type={'text'} danger />
          </Popconfirm>
        </Flex>
      </Flex>
    </Card>
  );
};
