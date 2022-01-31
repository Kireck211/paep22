const {sum, asyncSum} = require('./utils');

describe('sum', () => {
  it('return the sum of two values', () => {
    // Arrange
    const num1 = 1;
    const num2 = 2;
    const expectedResult = 3;

    // Act
    const result = sum(num1, num2);

    // Assert
    expect(result).toBe(expectedResult);
  });

  it('return the sum of n parameters', () => {
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
  it('return the sum after waiting 500 ms', async () => {
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