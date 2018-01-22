import ModalTriggerBootstrap3 from './ModalTrigger.bootstrap3.jsx';
import ModalTriggerBootstrap4 from './ModalTrigger.bootstrap4.jsx';
import ModalTriggerSemantic from './ModalTrigger.semantic.jsx';
import { registerComponent } from 'meteor/vulcan:lib';

registerComponent('ModalTrigger', ModalTriggerBootstrap3, { framework: 'bootstrap3' });
registerComponent('ModalTrigger', ModalTriggerBootstrap4, { framework: 'bootstrap4' });
registerComponent('ModalTrigger', ModalTriggerSemantic, { framework: 'semantic' });
