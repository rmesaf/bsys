const { dateGreaterThan } = require('.');

describe('dateGreaterThan Tests', () => {
  it('Should return true if d1 is greater than d2', () => {
    const expected = true;
    const d1 = '2020-01-20';
    const d2 = '2019-12-15';
    const result = dateGreaterThan(d1, d2);
    expect(expected).toBe(result);
  });

  it('Should return false if d1 is minor than d2', () => {
    const expected = false;
    const d1 = '2019-12-15';
    const d2 = '2020-01-20';
    const result = dateGreaterThan(d1, d2);
    expect(expected).toBe(result);
  });
});