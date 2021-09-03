/**
 * Return an array of allocated sales orders.
 * 
 * @param {array} salesOrders
 * @param {array} purchaceOrders
 * @returns {array} allocations
 */

const isArray = require('../isArray/isArray');

function allocate(salesOrders, purchaceOrders) {
  if (!isArray(salesOrders) || !isArray(purchaceOrders)) {
    throw new Error('Allocate should receive arrays as params');
  }
  const hasOrders = salesOrders.length !== 0;

  if(!hasOrders) {
    return salesOrders;
  }
}

module.exports = allocate;
