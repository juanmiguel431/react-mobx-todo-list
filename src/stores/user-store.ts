import { User } from '../models';
import { action, makeObservable, observable } from 'mobx';
import { RootStore } from './index';

export default class UserStore {
  items: User[] = [];
  private rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeObservable(this, {
      items: observable,
      add: action,
      remove: action
    });
  }

  add(name: string) {
    const item = new User(this);
    item.name = name;
    this.items.push(item);
  }

  remove(id: string) {
    const index = this.items.findIndex(u => u.id === id);
    if (index === -1) return;

    const user = this.items[index];
    this.items.splice(index, 1);

    return user;
  }
}
