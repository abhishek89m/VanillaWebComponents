export async function getCarts() {
  let carts = localStorage.getItem('carts');

  if (carts === null) {
    carts = await fetch(`/api/carts.json`).then((response) => response.json());
    localStorage.setItem('carts', JSON.stringify(carts));
    return carts;
  }

  return JSON.parse(carts);
};

export async function createCart(name, description) {
  let carts = await getCarts();

  if (carts.some((cart) => cart.name === name)) {
    // Trying to add the same cart again
    return;
  }

  carts.push({
    name,
    description,
    id: `cart-${Date.now()}`, // Using current timestamp as unique ID
    items: [], // Leaving this empty
  });

  localStorage.setItem('carts', JSON.stringify(carts));
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
