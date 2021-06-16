export default {
  async getProducts() {
    let products = localStorage.getItem('products');

    if (products === null) {
      products = await fetch(`/api/products.json`).then((response) => response.json());
      localStorage.setItem('products', JSON.stringify(products));
      return products;
    }

    return JSON.parse(products);
  },
};
