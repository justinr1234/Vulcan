import IconBootstrap from './Icon.bootstrap.jsx';
import IconSemantic from './Icon.semantic.jsx';
import { registerComponent } from 'meteor/vulcan:lib';

registerComponent('Icon', IconBootstrap);
registerComponent('Icon', IconSemantic, { framework: 'semantic' });
