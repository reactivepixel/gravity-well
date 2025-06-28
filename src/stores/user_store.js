class User_Store {
  constructor() {
    this.users = [];
    this.listeners = [];
  }

  add_listener(listener) {
    this.listeners.push(listener);
  }

  remove_listener(listener) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  notify_listeners() {
    this.listeners.forEach((listener) => listener(this.users));
  }

  set_users(users) {
    this.users = users;
    this.notify_listeners();
  }

  add_user(user) {
    this.users = [...this.users, user];
    this.notify_listeners();
  }

  delete_user(user_id) {
    this.users = this.users.filter((user) => user.id !== user_id);
    this.notify_listeners();
  }
}

const user_store = new User_Store();
export default user_store;
