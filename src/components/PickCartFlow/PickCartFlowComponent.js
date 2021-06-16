import { BaseComponent } from '../../utils/BaseComponent.js';
import CartsService from '../../services/CartsService.js';

export const PickCartFlowIdentifier = 'pick-cart-flow';

export class PickCartFlowComponent extends BaseComponent {
  constructor() {
    super('PickCartFlow', PickCartFlowIdentifier);
    this.loadCarts();
  }

  async loadCarts() {
    const carts = await CartsService.getCarts();
    this.listen('loaded', () => {
      const cartsContainer = this.shadowRoot.querySelector(
        '.pick-cart-flow-container'
      );

      console.log(carts);

      carts.forEach(({ id, name }) => {
        const cartItem = this.getCartItemElement();
        cartItem.id = id;
        cartItem.querySelector('.cart-name').innerText = name;
        cartsContainer.appendChild(cartItem);
      });
    });    
  }

  getCartItemElement() {
    const { content } = this.shadowRoot.querySelector(
      '#template-cart-item-box'
    );
    return content.cloneNode(true);
  }

  connectedCallback() {}
}
