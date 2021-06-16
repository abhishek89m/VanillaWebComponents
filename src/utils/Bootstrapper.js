import { toKebab } from './ConvertCase.js';

/** Retuns a clone of the template's fragment content */
export const getTemplateContent = (template) =>
  template.content.cloneNode(true);

/**
 * Defines the component custom element based on the identifier
 *  and component instance provided.
 *
 * @param {String} componentIdentifier 
 * @param {String} component 
 * @returns 
 */
export function defineComponent(componentIdentifier, component) {
  if (customElements.get(componentIdentifier)) {
    return;
  }

  customElements.define(componentIdentifier, component);
};

/**
 * Loads the contents of a component into a custom element
 *  for reusing it in the app.
 * 
 * This is useful for components intended to be plain layouts
 *  with markup and styling only.
 *
 * @param {array} components
 */
export function bootstrap(components) {
  components.forEach(async (componentName) => {
    // Generating kebab case name from component name
    const identifier = toKebab(componentName);

    // Getting component template
    const componentTemplate = await getComponentTemplate(
      componentName,
      identifier
    );

    // Defining an element by the kebab case name of component provided
    defineComponent(
      identifier,
      class extends HTMLElement {
        constructor() {
          super();

          // Appending clone of fragment obtained from the component template
          //  into the shadow root of the custom element
          const shadowRoot = this.attachShadow({ mode: 'open' });
          shadowRoot.appendChild(getTemplateContent(componentTemplate));

          // Inserting style element into custom element for adding hidden styles
          const hiddenStyle = document.createElement('style');
          this.appendChild(hiddenStyle);

          // Adding display rule to element at beginning of style sheet
          hiddenStyle.sheet.insertRule(`${identifier} { display: block }`, 0);
        }
      }
    );
  });
}

/**
 * Fetches the component template from components folder if template
 *  is already not available in markup
 *
 * @param {String} componentName
 * @param {String} identifier
 * @returns
 */
export async function getComponentTemplate(componentName, identifier) {
  let componentTemplate = document.querySelector(`#template-${identifier}`);

  // Returning early if template was already defined before
  if (componentTemplate !== null) {
    return componentTemplate;
  }

  // Fetching the contents of the component from components folder
  const content = await fetch(
    `/src/components/${componentName}/index.html`
  ).then((response) => response.text());

  // Creating a new template file
  componentTemplate = document.createElement('template');
  componentTemplate.id = `template-${identifier}`;
  componentTemplate.innerHTML = content;

  // Appending the template element in the end of body for the possibility of reusing it
  document.body.appendChild(componentTemplate);

  return componentTemplate;
}
