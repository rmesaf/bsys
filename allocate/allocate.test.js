const allocate = require('./allocate');

describe('Allocate Tests', () => {
  it('Should throw an exception if one of the parameters is not an array', () => {
    const exceptionMessage = 'Allocate should receive arrays as params';
    expect(() => {
      return allocate('[]', []);
    }).toThrow(exceptionMessage);
  });

  it('Should return empty if there is not salesOrders (No demand)', () => {
    const expected = [];
    const result = allocate([],[]);
    expect(expected).toEqual(result);
  });
});