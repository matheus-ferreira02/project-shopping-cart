let array = [];

const saveLocalStorage = (item) => {
  if (array.includes(item)) {
    const index = array.indexOf(item);
    array.splice(index, 1);
  } else {
    array = [...array, item];
  }  
  localStorage.setItem('cartItems', array);
}

if (typeof module !== 'undefined') {
  module.exports = saveLocalStorage;
}
