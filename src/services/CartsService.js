export default {
  async getCarts() {
    let carts = localStorage.getItem('carts');

    if (carts === null) {
      carts = await fetch(`/api/carts.json`).then((response) => response.json());
      localStorage.setItem('carts', JSON.stringify(carts));
      return carts;
    }

    return JSON.parse(carts);
  },
};
