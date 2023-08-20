import { Todo } from '../models';
import { action, makeObservable, observable } from 'mobx';
import { RootStore } from './index';

export default class TodoStore {
  items: Todo[] = [];
  private rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeObservable(this, {
      items: observable,
      add: action,
      remove: action
    });
  }

  add(userId: string, name: string) {
    const item = new Todo(this);
    item.userId = userId;
    item.name = name;
    this.items.push(item);
  }

  remove(id: string) {
    const index = this.items.findIndex(u => u.id === id);
    if (index === -1) return;

    const item = this.items[index];
    this.items.splice(index, 1);

    return item;
  }
}
