const { isArray } = require('../array');
const { dateGreaterThan, printSeparator } = require('../helpers');
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
  try {
    if (!isArray(salesOrders) || !isArray(purchaceOrders)) {
      throw new Error('Allocate should receive two arrays as params');
    }
    const hasDemand = !!salesOrders.length;
    const hasSuppy = !!purchaceOrders.length;
  
    if(!hasDemand) {
      return [];
    }
  
    const [currentOrder, ...restOrders] = salesOrders;
    const hasEnoughToSend = store.stock - currentOrder.quantity >= 0 
  
    if(hasDemand && !hasSuppy && !hasEnoughToSend) {
      ordersIds = salesOrders.reduce((ordersIds, current) => {
        ordersIds.push(current.id);
        return ordersIds;
      }, []);
      printSeparator('WARNING');
      console.log('There is not enough supply or inventory to dispatch orders:', ordersIds.join(','))
      printSeparator();
      return [];
    }
  
    if(hasEnoughToSend) {
      store.removeItems(currentOrder.quantity);
      let nextShipment = currentOrder.created;
      if (store.shipment && dateGreaterThan(store.shipment, currentOrder.created)) {
        nextShipment = store.shipment;
      }
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
  } catch(err) {
    printSeparator('ERROR');
    console.log(err.message);
    return [];
  }
}

module.exports = allocate;
