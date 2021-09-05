const allocate = require('./allocate');
const { getSortedArray } = require('./array');
const { printSeparator } = require('./helpers');
const { purchases, sales } = require('./mockData'); 
const sortedOrders = getSortedArray(sales, 'created');
const sortedPurcheses = getSortedArray(purchases, 'receiving');
const allocations = allocate(sortedOrders, sortedPurcheses);
console.log('Allocations:', allocations);
printSeparator();