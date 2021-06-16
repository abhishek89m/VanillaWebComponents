import { BaseComponent } from '../../utils/BaseComponent.js';
import {
  createCart,
  getCarts,
  deleteCart,
} from '../../services/CartsService.js';
import ProductsService from '../../services/ProductsService.js';

export const PickCartFlowIdentifier = 'pick-cart-flow';

export class PickCartFlowComponent extends BaseComponent {
  products = [];

  constructor() {
    super('PickCartFlow', PickCartFlowIdentifier);
    this.loadProducts();
    this.loadCarts();
  }

  async loadCarts() {
    const carts = await getCarts();
    this.listen('loaded', () => {
      const cartsContainer = this.shadowRoot.querySelector(
        '.pick-cart-flow-container'
      );

      carts.forEach(({ id, name }) => {
        if (!!cartsContainer.querySelector(`#${id}`)) {
          return;
        }

        const cartItem = this.getCartItemElement();
        cartItem.querySelector('.cart-item').id = id;
        cartItem.querySelector('.cart-name').innerText = name;
        cartsContainer.appendChild(cartItem);
      });

      this.shadowRoot.querySelector('.new-cart')
        .addEventListener('click', (e) => {
          this.shadowRoot
            .querySelector('.add-cart-popup')
            .classList.toggle('hidden', false);
        });
      
      this.shadowRoot
        .querySelector('.add-cart-popup')
        .addEventListener('click', (e) => {
          if (
            !e.target.classList.contains('cancel-button') &&
            !e.target.classList.contains('close-icon') &&
            !!e.target.closest('.content')
          ) {
            return false;
          }

          e.stopPropagation();
          this.hideAddModal();
        });

      this.shadowRoot
        .querySelector('.save-button')
        .addEventListener('click', async () => {
          const { value: cartName } =
            this.shadowRoot.querySelector('#cart-name');

          const { value: cartDescription } =
            this.shadowRoot.querySelector('#cart-description');

          const id = await createCart(cartName, cartDescription);

          this.hideAddModal();

          this.emit('cart-selected', id);
        });

      this.shadowRoot
        .querySelectorAll('.delete-icon')
        .forEach((node) => {
          node.addEventListener('click', async (e) => {
            e.stopPropagation();

            const cartItem = e.target.closest('.cart-item');

            const isDeleted = await deleteCart(cartItem.id);
            if (isDeleted) {
              cartItem.remove();
            }
          });
        });
      
      this.shadowRoot
        .querySelectorAll('.cart-item:not(.new-cart)')
        .forEach((node) => {
          node.addEventListener('click', async (e) => {
            e.stopPropagation();
            this.emit('cart-selected', e.target.closest('.cart-item').id);
          });
        });
        
    });
  }

  hideAddModal() {
    this.shadowRoot
      .querySelector('.add-cart-popup')
      .classList.toggle('hidden', true);
  }

  async loadProducts() {
    this.products = await ProductsService.getProducts();
  }

  getCartItemElement() {
    const { content } = this.shadowRoot.querySelector(
      '#template-cart-item-box'
    );
    return content.cloneNode(true);
  }
}
