import { makeObservable, observable } from 'mobx';
import { v4 as uuidv4 } from 'uuid';
import TodoStore from '../stores/todo-store';
import UserStore from '../stores/user-store';

export class User {
  id: string | null = null;
  name: string | null = null;

  constructor(store: UserStore) {
    this.id = uuidv4().replace(/-/g, '');

    makeObservable(this, {
      name: observable
    })
  }
}

export class Todo {
  id: string | null = null;
  name: string | null = null;
  userId: string | null = null;

  constructor(store: TodoStore) {
    this.id = uuidv4().replace(/-/g, '');

    makeObservable(this, {
      name: observable,
      userId: observable
    })
  }
}
