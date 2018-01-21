import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactBootstrapDropdownButton from 'react-bootstrap/lib/DropdownButton';

// TODO: Support SplitButton
// https://react-bootstrap.github.io/components/dropdowns/#btn-dropdowns-split
// vs
// https://reactstrap.github.io/components/button-dropdown/

export default class DropdownButton extends Component {
  static defaultProps = {
    bsStyle: null,
    bsSize: null,
    color: null,
    size: null,
    noCaret: null,
    caret: null
  }

  static propTypes = {
    bsStyle: PropTypes.string,
    bsSize: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.string,
    noCaret: PropTypes.bool,
    caret: PropTypes.bool
  }

  render() {
    let {
      color,
      bsStyle,
      bsSize,
      size,
      noCaret,
      caret,
      ...otherProps
    } = this.props;

    // Convert from reactstrap syntax to react-bootstrap syntax
    if (!bsStyle && color) {
      bsStyle = color;
    }

    if (!bsSize && size) {
      bsSize = size;
    }

    if ([undefined, null].includes(noCaret) && ![undefined, null].includes(caret)) {
      noCaret = !caret;
    }

    return (
      <ReactBootstrapDropdownButton bsStyle={bsStyle} bsSize={bsSize} noCaret={noCaret} {...otherProps} />
    );
  }
}
