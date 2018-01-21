import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactBootstrapAlert from 'react-bootstrap/lib/Alert';

// TODO: Support outline button - https://reactstrap.github.io/components/buttons/

export default class Alert extends Component {
  static defaultProps = {
    bsStyle: null,
    bsSize: null,
    color: null,
    className: null,
    active: null,
    isOpen: null
  }

  static propTypes = {
    bsStyle: PropTypes.string,
    bsSize: PropTypes.string,
    color: PropTypes.string,
    className: PropTypes.string,
    active: PropTypes.bool,
    isOpen: PropTypes.bool
  }

  render() {
    let {
      color,
      bsStyle,
      bsSize,
      className,
      active,
      isOpen,
      ...otherProps
    } = this.props;

    // Convert from reactstrap syntax to react-bootstrap syntax
    if (!bsStyle && color) {
      bsStyle = color;
    }

    // Convert className from reactstrap to bsSize
    if (!bsSize && className) {
      bsSize = ['lg', 'large', 'sm', 'small', 'xs', 'xsmall'].find(s => className.includes(s));
    }

    if ([undefined, null].includes(active) && ![undefined, null].includes(isOpen)) {
      active = isOpen;
    }

    return (
      <ReactBootstrapAlert bsStyle={bsStyle} bsSize={bsSize} className={className} active={active} {...otherProps} />
    );
  }
}
