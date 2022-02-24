const {getJSON, saveJSON} = require('../utils/fileHelpers');

class User {
  constructor() {
    this.saveData = saveJSON;
    this.fetchData = getJSON;
  }

  async find(id) {
    const users = this.fetchData();
    const user = users.find(user => user.id === id);
    if (user) return user;
    return Promise.reject(new Error(`User with id ${id} not found`));
  }

  async create(user) {
    const users = this.fetchData();
    if (user.id && user.email && user.imageUrl) {
      users.push(user);
      this.saveData(users);
      return user;
    }
    return Promise.reject(new Error('Could not create user'));
  }
};

module.exports = new User();