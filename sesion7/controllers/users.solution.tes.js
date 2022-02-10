const proxyquire = require('proxyquire').noCallThru();

const mockedData = {
  users: [
    { name: 'name1', lastName: 'lastName1', username: 'username1' },
    { name: 'name2', lastName: 'lastName2', username: 'username2' },
    { name: 'name3', lastName: 'lastName3', username: 'username3' },
    { name: 'name4', lastName: 'lastName4', username: 'username4' },
  ]
};

const getJSON = () => {
  return mockedData;
};
const saveJSON = () => {
};

const userController = proxyquire('./user', {
  '../utils/fileHelpers': {
    getJSON, saveJSON
  }
})

describe('userController', () => {
  describe('list', () => {
    it('returns users', () => {
      // Arrange
      const {users: expectedUsers} = mockedData;

      // Act
      const users = userController.list();

      // Assert
      expect(users).toEqual(expectedUsers);
    });

    it('return index from an existent index', () => {
      // Arrange
      const expectedIndex = 0;

      // Act
      const index = userController.getIndex('username1');

      // Assert
      expect(index).toEqual(expectedIndex);
    });
  });
});