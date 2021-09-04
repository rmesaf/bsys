const Store = (function(){
  function storeInventary() {
    this.stock = 1;
    this.shipment = '';
    this.setStock = (newStock) => this.stock = newStock;
    this.addItems = (productsAmount) => this.stock += productsAmount;
    this.removeItems = (productsAmount) => {
      const newStock = this.stock - productsAmount;
      if(newStock >= 0) {
        this.stock = newStock
      }
    }
    this.assignNextShipment = (nextShipmentDate) => this.shipment = nextShipmentDate;
  }

  let inventory;

  function createStoreInventary() {
    inventory = new storeInventary()
    return inventory;
  }

  return {
    getInventory: () => {
      if(!inventory) {
        inventory = createStoreInventary();
        return inventory;
      }
      return inventory;
    }
  }
})();

module.exports = Store;
