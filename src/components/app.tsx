import React from 'react';
import { Tabs, TabsProps } from 'antd';
import Users from './users';
import Todos from './todos';

// We should have 2 views in our application
// We should be able to move between the 2 views
//
// First one is a list of todos
// We should be able to see the todos separated into 2 lists:
//   Complete and Incomplete
// We should have ability to: add, remove, edit
// We should see todo name and user id
//
// Second views is a list of users and their todo
// We should be able to add/remove users
// We should be able to select current user and see only his todos
// We should be able to:  add, remove, edit his todos

function App() {

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Users`,
      children: <Users/>,
    },
    {
      key: '2',
      label: `To-Do List`,
      children: <Todos/>,
    },
  ];

  return (
    <div className="app">
      <h1>My App</h1>
      <Tabs
        defaultActiveKey="1"
        items={items}
      />
    </div>
  );
}

export default App;
