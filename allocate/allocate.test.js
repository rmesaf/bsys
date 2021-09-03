const allocate = require('../allocate/allocate');

describe('Allocate Tests', () => {
  it('Should throw an exception if one of the parameters is not an array', () => {
    const expected = () => {
      allocate('[]', []);
    };
    expect(expected).toThrow('Allocate should receive arrays as params');
  });
});