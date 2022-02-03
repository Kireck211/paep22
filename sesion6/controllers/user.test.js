const proxyquire = require('proxyquire');

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
});