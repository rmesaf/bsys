const isArray = require('./isArray');

describe('isArray Tests', () => {
  it('Should true if the param is typeof array', () => {
    const expected = true;
    const result = isArray([]);
    expect(expected).toBe(result);
  });

  it('Should false if the param is not typeof array', () => {
    const expected = false;
    const result = isArray('[]');
    expect(expected).toBe(result);
  });
});