const getItemLocalStorage = () => localStorage.getItem('cartItems');

if (typeof module !== 'undefined') {
  module.exports = getItemLocalStorage;
}
