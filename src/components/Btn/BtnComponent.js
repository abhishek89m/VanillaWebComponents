import { BaseComponent } from '../../utils/BaseComponent.js';

export const BtnIdentifier = 'bkt-button';

export class BtnComponent extends BaseComponent {
  constructor() {
    super('Btn', BtnIdentifier);
  }

  connectedCallback() {
    this.addEventListener('mousemove', ({ pageX, pageY, target: element }) => {
      const x = pageX - element.offsetLeft;
      const y = pageY - element.offsetTop;

      element.style.setProperty('--x', `${x}px`);
      element.style.setProperty('--y', `${y}px`);
    });
  }
}
