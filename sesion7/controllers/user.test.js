const proxyquire = require('proxyquire');
const {NotFoundError} = require('../utils/errors');

const mockedData = {
  "users": [
    {name: 'name', lastName: 'lastName', username: 'username'},
    {name: 'name1', lastName: 'lastName1', username: 'username1'},
    {name: 'name2', lastName: 'lastName2', username: 'username2'},
    {name: 'name3', lastName: 'lastName3', username: 'username3'},
  ]
};

const mockedGetJSON = () => {
  // console.log('Called fake getJSON');
  return mockedData;
}
const mockedSaveJSON = () => {
  // console.log('Called fake saveJSON');
};

const userController = proxyquire('./user', {
  '../utils/fileHelpers': {
    getJSON: mockedGetJSON,
    saveJSON: mockedSaveJSON
  }
});

describe('userController', () => {
  describe('list', () => {
    it ('return correct users', () => {
      // Arrange
      const expectedResult = mockedData.users;

      // Act
      const result = userController.list();

      // Assert
      expect(result).toEqual(expectedResult);
    });
  });

  describe('getIndex', () => {
    it('return -1 when empty string', () => {
      // Arrange
      const username = '';
      const expectedIndex = -1;

      // Act
      const index = userController.getIndex(username);

      // Assert
      expect(index).toBe(expectedIndex);
    });
  });

  describe('get', () => {
    it('return the user when username exists', () => {
      // Arrange
      const username = 'username';
      const expectedUser = mockedData.users[0];

      // Act
      const user = userController.get(username);

      // Assert
      expect(user).toEqual(expectedUser);
    });

    it('throw an error when the username does not exist', () => {
      // Arrange
      const username = 'doesNotExist404';

      // Act
      const fn = () => userController.get(username);

      // Assert
      expect(fn).toThrowError(NotFoundError, /user/);
    });
  });

  describe('delete', () => {
    it('throw an error when the username does not exist', () => {
      // Arrange
      const username = 'doesNotExist404';
      // Act
      const fn = () => userController.delete(username);
      // Assert
      expect(fn).toThrowError(NotFoundError, /user/);
    });
  });
});