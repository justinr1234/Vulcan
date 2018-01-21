import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactBootstrapButton from 'react-bootstrap/lib/Button';

// TODO: Support outline button - https://reactstrap.github.io/components/buttons/

export default class Button extends Component {
  static defaultProps = {
    bsStyle: null,
    bsSize: null,
    color: null,
    size: null
  }

  static propTypes = {
    bsStyle: PropTypes.string,
    bsSize: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.string
  }

  render() {
    let {
      color,
      size,
      bsStyle,
      bsSize,
      ...otherProps
    } = this.props;

    // Convert from reactstrap syntax to react-bootstrap syntax
    if (!bsStyle && color) {
      bsStyle = color;
    }

    if (!bsSize && size) {
      bsSize = size;
    }

    return (
      <ReactBootstrapButton bsStyle={bsStyle} bsSize={bsSize} {...otherProps} />
    );
  }
}
