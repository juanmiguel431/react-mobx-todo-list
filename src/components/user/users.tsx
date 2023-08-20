import React, { useCallback, useContext, useState } from 'react';
import { StoreContext } from '../../stores';
import { Observer, observer } from 'mobx-react-lite';
import { Button, Input, Col, Row, Table, Divider, Modal, Drawer, Space, Form } from 'antd';
import { toJS } from 'mobx';
import { User } from '../../models';
import UserForm from './user-form';

export const Users: React.FC = observer(function Users() {
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [modal, contextHolder] = Modal.useModal();
  const { userStore } = useContext(StoreContext);

  const [form] = Form.useForm<User>();

  const onAddNew = useCallback(() => {
    setUser(null);
    form.resetFields();
    setOpen(true);
  }, [form]);

  const onDelete = useCallback(async (user: User) => {
    const confirmed = await modal.confirm({
      title: `Are you sure you?`,
      content: `User ${user.name} will be deleted.`,
    });
    if (confirmed) {
      userStore.remove(user.id);
    }
  }, [userStore, modal]);

  const tableActions = useCallback((_: any, user: User) => {
    return (
      <>
        <Observer>
          {() => {
            const selected = userStore.selected?.id === user.id;
            return (
              <Button
                style={{width: '100px'}}
                disabled={selected}
                onClick={_ => {
                  userStore.select(user.id);
                }}
              >
                {selected ? 'Selected' : 'Select'}
              </Button>
            );
          }}
        </Observer>
        <Divider type="vertical"/>
        <Button
          onClick={_ => {
            form.setFieldsValue(user);
            setUser(user);
            setOpen(true);
          }}
        >
          Update
        </Button>
        <Divider type="vertical"/>
        <Button
          danger
          onClick={_ => onDelete(user)}
        >
          Delete
        </Button>
      </>
    )
  }, [userStore, onDelete, form]);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onSave = useCallback(() => {
    form.validateFields().then((formValues) => {
      if (user) {
        Object.assign(user, formValues);
        userStore.update(user);
      } else {
        userStore.add(formValues.name || '');
      }

      setOpen(false);
      form.resetFields();
    }, () => {
    })
  }, [form, userStore, user]);

  return (
    <div className="users">
      <h2>Users</h2>
      <Row gutter={16}>
        <Col span={12}>
          <Input
            allowClear
            placeholder="Juan Miguel"
            value={input}
            onChange={e => setInput(e.target.value)}
            onPressEnter={onAddNew}
          />
        </Col>
        <Col span={12}>
          <Button
            type="primary"
            onClick={onAddNew}
          >
            Add new
          </Button>
        </Col>
      </Row>
      <Table
        rowKey="id"
        dataSource={toJS(userStore.items)}
        columns={[
          {
            title: 'Name',
            dataIndex: 'name'
          },
          {
            title: 'Name',
            dataIndex: 'name',
            render: tableActions
          }
        ]}
      />
      {contextHolder}

      <Drawer
        title="User"
        destroyOnClose
        width="40%"
        onClose={onClose}
        open={open}
        bodyStyle={{ paddingBottom: 80 }}
        footerStyle={{ display: 'flex', justifyContent: 'end' }}
        footer={
          <div className="footer">
            <Space>
              <Button onClick={onClose}>Cancel</Button>
              <Button onClick={onSave} type="primary">
                Save
              </Button>
            </Space>
          </div>
        }
      >
        <UserForm form={form}/>
      </Drawer>

    </div>
  );
});

export default Users;
