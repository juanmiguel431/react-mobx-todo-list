import { User } from '../models';
import { action, makeObservable, observable } from 'mobx';
import { RootStore } from './index';

export default class UserStore {
  items: User[] = [];
  selected: User | null = null;
  private rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeObservable(this, {
      items: observable,
      add: action,
      remove: action,
      update: action,
      selected: observable,
      select: action
    });
  }

  select(userId: string) {
    const user = this.items.find(u => u.id === userId);
    this.selected = user || null;
  }

  add(name: string) {
    const item = new User(this);
    item.name = name;
    this.items.push(item);
  }

  update(user: User) {
    const item = this.items.find(u => u.id === user.id);
    if (!item) return;
    Object.assign(item, user);
  }

  remove(id: string) {
    const index = this.items.findIndex(u => u.id === id);
    if (index === -1) return;

    const user = this.items[index];
    this.items.splice(index, 1);

    return user;
  }
}
