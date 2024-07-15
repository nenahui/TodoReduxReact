import { Button, Flex, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../app/store';
import { createTodo } from '../../containers/Home/homeSlice';
import type { ApiTodo } from '../../types';

export const TodoForm = () => {
  const [form] = Form.useForm();
  const dispatch: AppDispatch = useDispatch();
  const isCreating = useSelector((state: RootState) => state.home.isCreating);

  const onFormSubmit = (todo: ApiTodo) => {
    const data = {
      ...todo,
      completed: false,
    };
    dispatch(createTodo(data));
    form.resetFields();
  };

  return (
    <Form form={form} layout={'vertical'} onFinish={onFormSubmit}>
      <Flex gap={'middle'} vertical>
        <Form.Item<ApiTodo>
          name={'title'}
          layout={'vertical'}
          className={'m-0'}
          rules={[
            {
              required: true,
              message: 'Please enter the task name, this is required…',
            },
          ]}
        >
          <Input placeholder={'Enter the title of the todo…'} />
        </Form.Item>

        <Button type={'primary'} htmlType={'submit'} loading={isCreating}>
          Create
        </Button>
      </Flex>
    </Form>
  );
};
