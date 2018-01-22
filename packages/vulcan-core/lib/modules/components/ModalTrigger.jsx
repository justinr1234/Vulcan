import ModalTriggerBootstrap3 from './ModalTrigger.bootstrap3.jsx';
import ModalTriggerBootstrap4 from './ModalTrigger.bootstrap4.jsx';
import { registerComponent } from 'meteor/vulcan:lib';

registerComponent('ModalTrigger', ModalTriggerBootstrap3);
registerComponent('ModalTrigger', ModalTriggerBootstrap4, { framework: 'bootstrap4' });
