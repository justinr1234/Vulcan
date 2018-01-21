import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactBootstrapModal from 'react-bootstrap/lib/Modal';

export default class Modal extends Component {
  static defaultProps = {
    bsSize: null,
    size: null,
    onEntered: null,
    onOpened: null,
    onExited: null,
    onClosed: null,
    animation: null,
    fade: null,
    show: null,
    isOpen: null,
  }

  static propTypes = {
    bsSize: PropTypes.string,
    size: PropTypes.string,
    onEntered: PropTypes.func,
    onOpened: PropTypes.func,
    onExited: PropTypes.func,
    onClosed: PropTypes.func,
    animation: PropTypes.bool,
    fade: PropTypes.bool,
    show: PropTypes.bool,
    isOpen: PropTypes.bool
  }

  render() {
    let {
      size,
      onOpened,
      bsSize,
      onEntered,
      onExited,
      onClosed,
      animation,
      fade,
      show,
      isOpen,
      ...otherProps
    } = this.props;

    // Convert from reactstrap syntax to react-bootstrap syntax
    if (!bsSize && size) {
      bsSize = size;
    }

    if ([undefined, null].includes(onEntered) && ![undefined, null].includes(onOpened)) {
      onEntered = onOpened;
    }

    if ([undefined, null].includes(onExited) && ![undefined, null].includes(onClosed)) {
      onExited = onClosed;
    }

    if ([undefined, null].includes(animation) && ![undefined, null].includes(fade)) {
      animation = fade;
    }

    if ([undefined, null].includes(show) && ![undefined, null].includes(isOpen)) {
      show = isOpen;
    }

    if ([undefined, null].includes(animation)) {
      animation = true;
    }

    if ([undefined, null].includes(onEntered)) {
      onEntered = () => {};
    }

    if ([undefined, null].includes(onExited)) {
      onExited = () => {};
    }

    return (
      <ReactBootstrapModal bsSize={bsSize} onEntered={onEntered} onExited={onExited} animation={animation} show={show} {...otherProps} />
    );
  }
}
