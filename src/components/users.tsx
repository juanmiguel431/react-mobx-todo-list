import React, { useCallback, useContext, useState } from 'react';
import { StoreContext } from '../stores';
import { observer } from 'mobx-react-lite';
import { Button, Input, Col, Row } from 'antd';

export const Users: React.FC = observer(function Users() {
  const [input, setInput] = useState('');

  const { userStore } = useContext(StoreContext);

  const onAddNew = useCallback(() => {
    if (!input) return;
    userStore.add(input);
    setInput('');
  }, [userStore, input]);

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
      <ul>
        {userStore.items.map(u => <li key={u.id}>{u.name}</li>)}
      </ul>
    </div>
  );
});

export default Users;
