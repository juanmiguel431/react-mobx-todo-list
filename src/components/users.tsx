import React, { useCallback, useContext, useState } from 'react';
import { StoreContext } from '../stores';
import { observer } from 'mobx-react-lite';
import { Button, Input, Col, Row, Table, Divider, Modal } from 'antd';
import { toJS } from 'mobx';
import { User } from '../models';

export const Users: React.FC = observer(function Users() {
  const [input, setInput] = useState('');
  const [modal, contextHolder] = Modal.useModal();
  const { userStore } = useContext(StoreContext);

  const onAddNew = useCallback(() => {
    if (!input) return;
    userStore.add(input);
    setInput('');
  }, [userStore, input]);

  const onDelete = useCallback(async (user: User) => {
    const confirmed = await modal.confirm({
      title: `Are you sure you?`,
      content: `User ${user.name} will be deleted.`,
    });
    if (confirmed){
      userStore.remove(user.id);
    }
  }, [userStore, modal]);

  const tableActions = useCallback((v: any, user: User, i: number) => {
    return (
      <>
        <Button
          onClick={_ => {
            console.log('Update', user.name);
          }}
        >
          Update
        </Button>
        <Divider type="vertical"/>
        <Button
          danger
          type="primary"
          onClick={_ => onDelete(user)}
        >
          Delete
        </Button>
      </>
    )
  }, [onDelete]);

  return (
    <div className="users">
      <h2>Users</h2>
      <Row gutter={16}>
        <Col span={12}>
          <Input
            placeholder="Juan Miguel"
            value={input}
            onChange={e => setInput(e.target.value)}
            onPressEnter={onAddNew}
          />
        </Col>
        <Col span={12}>
          <Button
            disabled={!input}
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
    </div>
  );
});

export default Users;
