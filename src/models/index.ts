import { makeObservable, observable } from 'mobx';
import { v4 as uuidv4 } from 'uuid';

export class User {
  id: string | null;
  name: string | null = null;

  constructor() {
    this.id = uuidv4().replace(/-/g, '');

    makeObservable(this, {
      name: observable
    })
  }
}

export class Todo {
  id: string | null;
  name: string | null = null;

  constructor() {
    this.id = uuidv4().replace(/-/g, '');

    makeObservable(this, {
      name: observable
    })
  }
}
