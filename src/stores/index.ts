import UserStore from './user-store';
import TodoStore from './todo-store';
import { createContext } from 'react';

export class RootStore {
  userStore: UserStore;
  todoStore: TodoStore;

  constructor() {
    this.userStore = new UserStore(this);
    this.todoStore = new TodoStore(this);
  }
}

export const StoreContext = createContext<RootStore>({} as RootStore);

export const StoreProvider = StoreContext.Provider;
export const StoreConsumer = StoreContext.Consumer;

export const createStore = () => {
  return new RootStore();
};
