/**
 * Return an array of allocated sales orders.
 * 
 * @param {array} salesOrders
 * @param {array} purchaceOrders
 * @returns {array} allocations
 */

function allocate(salesOrders, purchaceOrders) {
  if (!Array.isArray(salesOrders) || !Array.isArray(purchaceOrders)) {
    throw new Error('Allocate should receive arrays as params');
  }
}

module.exports = allocate;
