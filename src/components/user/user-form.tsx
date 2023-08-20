import React from 'react';
import { Form, FormInstance, Input } from 'antd';

type UserFormProps = {
  form: FormInstance
}

export const UserForm: React.FC<UserFormProps> = ({ form }) => {

  return (
    <Form
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      autoComplete="off"
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input the name!' }]}
      >
        <Input/>
      </Form.Item>
    </Form>
  );
}

export default UserForm;
