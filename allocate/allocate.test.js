const allocate = require('.');
const { getSortedArray } = require('../array');

// SALES ORDERS
const sales = [{
  id: 'S1',
  created: '2020-01-02',
  quantity: 6
}, {
  id: 'S2',
  created: '2020-11-05',
  quantity: 2
}, {
  id: 'S3',
  created: '2019-12-04',
  quantity: 3
}, {
  id: 'S4',
  created: '2020-01-20',
  quantity: 2,
}, {
  id: 'S5',
  created: '2019-12-15',
  quantity: 9,
}];

// PURCHASE ORDERS
const purchases = [{
  id: 'P1',
  receiving: '2020-01-04',
  quantity: 4
}, {
  id: 'P2',
  receiving: '2020-01-05',
  quantity: 3
}, {
  id: 'P3',
  receiving: '2020-02-01',
  quantity: 5
}, {
  id: 'P4',
  receiving: '2020-03-05',
  quantity: 1
}, {
  id: 'P5',
  receiving: '2020-02-20',
  quantity: 7
}];

describe('Allocate Tests', () => {
  it('Should throw an exception if one of the parameters is not an array', () => {
    const expected = [];
    result = allocate('[]', []);
    expect(expected).toEqual(result);
  });

  it('Should return empty if there is not sales orders (No demand)', () => {
    const expected = [];
    const result = allocate([],[]);
    expect(expected).toEqual(result);
  });

  it('Should return a empty array of allocations if there is not enough inventary', () => {
    const expected = [];
    const result = allocate([{
      id: 'S5',
      created: '2019-12-15',
      quantity: 5,
    }], []);
    expect(expected).toEqual(result);
  });

  it('Should return an array of allocations if there is inventory', () => {
    const expected = [
      { id: 'S3', date: '2020-01-04' },     
      { id: 'S5', date: '2020-02-01' },     
      { id: 'S1', date: '2020-02-20' },     
      { id: 'S4', date: '2020-02-20' }
    ];
    const result = allocate(
      getSortedArray(sales, 'created'),
      getSortedArray(purchases, 'receiving'),
    );
    expect(expected).toEqual(result);
  });
});