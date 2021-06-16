import { bootstrap, defineComponent } from './utils/Bootstrapper.js';
import { BtnIdentifier, BtnComponent } from './components/Btn/BtnComponent.js';
import { CartFlowIdentifier, CartFlowComponent } from './components/CartFlow/CartFlowComponent.js';
import {
  PickCartFlowIdentifier,
  PickCartFlowComponent,
} from './components/PickCartFlow/PickCartFlowComponent.js';

/**
 * Bootstrapping from components folder
 *  This is for the layouts with markup and styling only
 */
bootstrap(['MainHeader', 'MainComponent']);

/**
 * Defining component from corresponding class.
 *  This approach is for those which need to have some scripting
 */
defineComponent(BtnIdentifier, BtnComponent);
defineComponent(CartFlowIdentifier, CartFlowComponent);
defineComponent(PickCartFlowIdentifier, PickCartFlowComponent);