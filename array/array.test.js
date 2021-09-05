const { isArray, getSortedArray } = require('.');

describe('isArray Tests', () => {
  it('Should return true if the param is typeof array', () => {
    const expected = true;
    const result = isArray([]);
    expect(expected).toBe(result);
  });

  it('Should return false if the param is not typeof array', () => {
    const expected = false;
    const result = isArray('[]');
    expect(expected).toBe(result);
  });
});

describe('getSortedArray Tests', () => {
  it('Should return an empty array if the param is not typeof array', () => {
    const expected = [];
    const result = getSortedArray('[]');
    expect(expected).toEqual(result);
  });

  it('Should return a sorted array by date', () => {
    const expected = [{
      id: 'T1',
      date: '2019-12-15',
    }, {
      id: 'T2',
      date: '2020-01-20',
    }];
    const mock = [{
      id: 'T2',
      date: '2020-01-20',
    }, {
      id: 'T1',
      date: '2019-12-15',
    }]
    const result = getSortedArray(mock);
    expect(expected).toEqual(result);
  });
});