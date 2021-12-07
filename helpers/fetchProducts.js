const fetchProducts = async (find) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${find}`;

  try {
    const data = await ((await (await fetch(url)).json()));
    return data.results;
  } catch (error) {
    console.log(error);
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
