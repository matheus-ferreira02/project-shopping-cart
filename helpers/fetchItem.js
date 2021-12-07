const fetchItem = async (item) => {
  const url = `https://api.mercadolibre.com/items/${item}`;

  try {
    const data = await (await fetch(url)).json();
    return data;
  } catch (error) {
    return new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}