import { BaseComponent } from '../../utils/BaseComponent.js';

export const CartFlowIdentifier = 'cart-flow';

export class CartFlowComponent extends BaseComponent {
  currentIndex = 1;

  constructor() {
    super('CartFlow', CartFlowIdentifier);
  }

  connectedCallback() {
    this.addEventListener(
      'click',
      ({ target: { classList, dataset, offsetWidth } }) => {
        if (!classList.contains('title')) {
          return false;
        }

        this.querySelectorAll('.title, .content').forEach((node) =>
          node.classList.remove('active')
        );

        classList.add('active');

        this.querySelector(`.${dataset.content}`).classList.add('active');

        const left = (dataset.index - 1) * offsetWidth;
        this.style.setProperty('--left', `-${left}px`);

        this.shadowRoot
          .querySelectorAll('.next-button, .back-button')
          .forEach((node) =>
            node.classList.toggle('hidden', dataset.index === '1')
          );

        this.currentIndex = parseInt(dataset.index);
      }
    );

    this.listen('loaded', () => {
      this.shadowRoot
        ?.querySelectorAll('.next-button.pre, .back-button.pre')
        .forEach((node) => {
          node.classList.remove('pre');
          node.addEventListener('click', ({ target }) => {
            if (target.classList.contains('next-button')) {
              this.currentIndex =
                this.currentIndex < 3 ? this.currentIndex + 1 : 3;
            } else {
              this.currentIndex =
                this.currentIndex > 1 ? this.currentIndex - 1 : 1;
            }

            this.querySelector(
              `.title[data-index='${this.currentIndex}']`
            )?.click();
          });
        });
    });

    this.listen('cart-selected', (id) => {
      this.currentIndex = 2;
      this.querySelector(`.title[data-index='${this.currentIndex}']`)?.click();
    });
  }
}
