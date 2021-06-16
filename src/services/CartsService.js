export async function getCarts() {
  let carts = localStorage.getItem('carts');

  if (carts === null) {
    carts = await fetch(`/api/carts.json`).then((response) => response.json());
    localStorage.setItem('carts', JSON.stringify(carts));
    return carts;
  }

  return JSON.parse(carts);
};

export async function getCart(id) {
  let carts = getCarts();
  return carts.find((cart) => cart.id === id);
};

export async function createCart(name, description) {
  let carts = await getCarts();

  const cartFound = carts.find((cart) => cart.name === name);
  if (cartFound) {
    // Trying to add the same cart again
    return cartFound.id;
  }

  // Using current timestamp as unique ID
  const id = `cart-${Date.now()}`;

  carts.push({
    id,
    name,
    description,
    items: [], // Leaving this empty
  });

  localStorage.setItem('carts', JSON.stringify(carts));

  return id;
};

/**
 * Returns boolean for whether item was deleted succesfully
 *
 * @param {number} cartId 
 * @returns 
 */
export async function deleteCart(cartId) {
  let carts = await getCarts();

  const updatedCarts = carts.filter((cart) => cart.id !== cartId);

  if (updatedCarts.length !== carts.length) {
    localStorage.setItem('carts', JSON.stringify(updatedCarts));
    return true;
  }

  return false;
};
