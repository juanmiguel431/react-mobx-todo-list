import UserStore from './user-store';
import TodoStore from './todo-store';


export class RootStore {
  userStore: UserStore;
  todoStore: TodoStore;

  constructor() {
    this.userStore = new UserStore(this);
    this.todoStore = new TodoStore(this);
  }
}


