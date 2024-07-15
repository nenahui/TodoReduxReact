import React from 'react';
import { Button, Flex, Form, Input } from 'antd';
import type { ApiTodo } from '../../types';

interface IProps {
  onSubmit: (todo: ApiTodo) => void;
}

export const TodoForm: React.FC<IProps> = ({ onSubmit }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} layout={'vertical'} onFinish={onSubmit}>
      <Flex gap={'middle'} vertical>
        <Form.Item<ApiTodo>
          name={'title'}
          layout={'vertical'}
          className={'m-0'}
          rules={[
            {
              required: true,
              message: 'Please enter the title of the todo…',
            },
          ]}
        >
          <Input placeholder={'Enter the title of the todo…'} />
        </Form.Item>

        <Button type={'primary'} htmlType={'submit'}>
          Create
        </Button>
      </Flex>
    </Form>
  );
};
