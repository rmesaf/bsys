const dateGreaterThan = (d1, d2) => {
  return new Date(d1) > new Date(d2);
}

const printSeparator = (type) => {
  if (type) {
    console.log(`----------------------------- ${type} -----------------------------`);
  } else {
    console.log('-------------------------------------------------------------------')
  }
}

module.exports = {
  dateGreaterThan,
  printSeparator,
}