const { sum, asyncSum, create, fileHandler} = require('./utils');

describe('sum', () => {
  it('returns correct value for two parameters', () => {
    // Arrange
    const num1 = 1;
    const num2 = 2;
    const expectedResult = 3;

    // Act
    const result = sum(num1, num2);

    // Assert
    expect(result).toBe(expectedResult);
  });

  it('returns correct value for more than two parameters', () => {
    // Arrange
    const num1 = 1;
    const num2 = 2;
    const num3 = 3;
    const expectedResult = 6;

    // Act
    const result = sum(num1, num2, num3);

    // Assert
    expect(result).toBe(expectedResult);
  });
});

describe('asyncSum', () => {
  it('waits and returns correct value fro two parameters', async () => {
    // Arrange
    const num1 = 1;
    const num2 = 2;
    const expectedResult = 3;

    // Act
    const result = await asyncSum(num1, num2);

    // Assert
    expect(result).toBe(expectedResult);
  });
});

describe('create', () => {
  it('give default values if undefined', () => {
    // Arrange
    const expectedSong = {name: '', author: ''};
    spyOn(fileHandler, 'save');

    // Act
    const createdSong = create(undefined,undefined);

    // Assert
    expect(createdSong).toEqual(expectedSong);
    expect(fileHandler.save).toHaveBeenCalledWith({author: '', name: ''});
  });

  it('should manage correcty if an error is thrown when saving', () => {
    // Arrange
    const author = 'Jerry Folk';
    const name = 'Futura';
    const expectedSong = {name, author};
    spyOn(fileHandler, 'save').and.throwError('Cannot find file');

    // Act
    const createdSong = create(author, name);
    // Assert
    expect(createdSong).not.toThrow;
  });
});
