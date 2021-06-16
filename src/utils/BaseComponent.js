import { getTemplateContent, getComponentTemplate } from './Bootstrapper.js';

const emitPrefix = 'bkt';

export class BaseComponent extends HTMLElement {
  constructor(componentName, identifier) {
    super();
    this.appendTemplate(componentName, identifier);
  }

  emit(eventName, detail) {
    const config = { bubbles: true, composed: true, detail };
    const customEvent = new CustomEvent(`${emitPrefix}-${eventName}`, config);

    this.dispatchEvent(customEvent);
  }

  listen(eventName, callback) {
    this.addEventListener(`${emitPrefix}-${eventName}`, ({ detail }) => callback?.(detail));
  }

  async appendTemplate(componentName, identifier) {
    const componentTemplate = await getComponentTemplate(
      componentName,
      identifier
    );

    // Appending clone of fragment obtained from the component template
    //  into the shadow root of the custom element
    const shadowRoot = this.attachShadow({ mode: 'open' });

    shadowRoot.appendChild(getTemplateContent(componentTemplate));

    // Inserting style element into custom element for adding hidden styles
    const hiddenStyle = document.createElement('style');
    this.appendChild(hiddenStyle);

    // Adding display rule to element at beginning of style sheet
    hiddenStyle.sheet.insertRule(`${identifier} { display: block }`, 0);

    // Notifying that template is loaded into the shadow dom
    this.emit('loaded');
  }
}
