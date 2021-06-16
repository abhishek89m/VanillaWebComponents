import { BaseComponent } from '../../utils/BaseComponent.js';
import ProductsService from '../../services/ProductsService.js';
import { getCart } from '../../services/CartsService.js';

export const ProductsFlowIdentifier = 'products-flow';

export class ProductsFlowComponent extends BaseComponent {
  products = [];
  cart = null;

  constructor() {
    super('ProductsFlow', ProductsFlowIdentifier);

    this.listen('cart-selected', (id) => {
      console.log(id);
      this.cart = getCart(id);
    });

    this.loadProducts();
  }

  hideAddModal() {
    this.shadowRoot
      .querySelector('.add-cart-popup')
      .classList.toggle('hidden', true);
  }

  async loadProducts() {
    this.products = await ProductsService.getProducts();

    this.listen('loaded', () => {
      const productContainer = this.shadowRoot.querySelector(
        '.products-flow-container'
      );

      this.products.forEach(({ id, name, price }) => {
        const product = this.getProductElement();
        const productElement = product.querySelector('.product');

        productElement.id = id
        product.querySelector('.product-name').innerText = name;
        product.querySelector('.product-price').innerText = price;

        productContainer.appendChild(product);
      });
    });
  }

  getProductElement() {
    const { content } = this.shadowRoot.querySelector(
      '#template-product'
    );
    return content.cloneNode(true);
  }
}
