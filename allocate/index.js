const { isArray } = require('../array');
const Store = require('../store');
const store = Store.getInventory();

/**
 * Return an array of allocated sales orders.
 * 
 * @param {array} salesOrders
 * @param {array} purchaceOrders
 * @returns {array} allocations
 */

function allocate(salesOrders, purchaceOrders) {
  if (!isArray(salesOrders) || !isArray(purchaceOrders)) {
    throw new Error('Allocate should receive arrays as params');
  }
  const hasDemand = !!salesOrders.length;
  const hasSuppy = !!purchaceOrders.length;

  if(!hasDemand) {
    return [];
  }

  if(hasDemand && !hasSuppy) {
    ordersIds = salesOrders.reduce((ordersIds, current) => {
      ordersIds.push(current.id);
      return ordersIds;
    }, [])
    console.log('There is not enough supply to dispatch:', ordersIds.join(','))
    return [];
  }

  const [currentOrder, ...restOrders] = salesOrders;
  if( (store.stock - currentOrder.quantity) >= 0 ) {
    store.removeItems(currentOrder.quantity);
    const nextShipment = store.shipment ? store.shipment : currentOrder.created
    store.assignNextShipment(nextShipment)
    return [
      { id: currentOrder.id, date: nextShipment },
      ...allocate(restOrders, purchaceOrders),
    ];
  } else {
    const [nextPurchace, ...restPurchaces] = purchaceOrders;
    const willHaveEnoughToSend = store.stock + nextPurchace.quantity >= currentOrder.quantity
    if(willHaveEnoughToSend) {
      const newStock = (store.stock + nextPurchace.quantity) - currentOrder.quantity;
      store.setStock(newStock);
      store.assignNextShipment(nextPurchace.receiving);
      return [
        { id: currentOrder.id, date: nextPurchace.receiving },
        ...allocate(restOrders, restPurchaces),
      ];
    } else {
      const newStock = store.stock + nextPurchace.quantity;
      store.setStock(newStock);
      store.assignNextShipment(nextPurchace.receiving);
      return [...allocate(salesOrders, restPurchaces)];
    }
  }
}

module.exports = allocate;
