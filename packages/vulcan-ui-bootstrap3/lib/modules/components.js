import { registerComponent } from 'meteor/vulcan:core';

// TODO: LinkContainer for reactstrap is just passing a tag prop:
//
// Pass in a Component to override default button element
// example: react-router Link
// default: 'button'
// tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
// https://reactstrap.github.io/components/buttons/
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';

import Button from '../components/Button.jsx';
import Dropdown from '../components/Dropdown.jsx';
import DropdownToggle from '../components/DropdownToggle.jsx';
import DropdownMenu from '../components/DropdownMenu.jsx';
import DropdownButton from '../components/DropdownButton.jsx';
import MenuItem from '../components/MenuItem.jsx';
import Alert from '../components/Alert.jsx';
import Modal from '../components/Modal.jsx';
import ModalHeader from '../components/ModalHeader.jsx';
import ModalBody from '../components/ModalBody.jsx';
import ModalFooter from '../components/ModalFooter.jsx';
import FormControl from '../components/FormControl.jsx';

registerComponent('Button', Button);
registerComponent('Dropdown', Dropdown);
registerComponent('DropdownToggle', DropdownToggle);
registerComponent('DropdownMenu', DropdownMenu);
registerComponent('DropdownButton', DropdownButton);
registerComponent('MenuItem', MenuItem);
registerComponent('Alert', Alert);
registerComponent('Modal', Modal);
registerComponent('ModalHeader', ModalHeader);
registerComponent('ModalBody', ModalBody);
registerComponent('ModalFooter', ModalFooter);
registerComponent('FormControl', FormControl);
registerComponent('LinkContainer', LinkContainer);
registerComponent('IndexLinkContainer', IndexLinkContainer);
