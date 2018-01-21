import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { default as ReactBootstrapDropdown } from 'react-bootstrap/lib/Dropdown';

export default class DropdownToggle extends Component {
  static defaultProps = {
    bsStyle: null,
    color: null,
    noCaret: null,
    caret: null,
    bsRole: 'toggle'
  }

  static propTypes = {
    bsStyle: PropTypes.string,
    color: PropTypes.string,
    noCaret: PropTypes.bool,
    caret: PropTypes.bool,
    bsRole: PropTypes.string
  }

  render() {
    let {
      color,
      bsStyle,
      noCaret,
      caret,
      ...otherProps
    } = this.props;

    // Convert from reactstrap syntax to react-bootstrap syntax
    if (!bsStyle && color) {
      bsStyle = color;
    }

    if ([undefined, null].includes(noCaret) && ![undefined, null].includes(caret)) {
      noCaret = !caret;
    }

    return (
      <ReactBootstrapDropdown.Toggle bsStyle={bsStyle} noCaret={noCaret} {...otherProps} />
    );
  }
}
