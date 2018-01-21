import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactBootstrapModal from 'react-bootstrap/lib/Modal';

// TODO: Support outline button - https://reactstrap.github.io/components/buttons/

export default class ModalHeader extends Component {
  static defaultProps = {
    closeLabel: null,
    closeAriaLabel: null,
    closeButton: null,
    toggle: null,
    onHide: null,
    title: null,
  }

  static propTypes = {
    closeLabel: PropTypes.string,
    closeAriaLabel: PropTypes.string,
    closeButton: PropTypes.bool,
    toggle: PropTypes.func,
    onHide: PropTypes.func,
    title: PropTypes.oneOf([PropTypes.string, PropTypes.node]),
  }

  render() {
    let {
      closeLabel,
      closeAriaLabel,
      closeButton,
      toggle,
      onHide,
      title,
      ...otherProps
    } = this.props;

    // Convert from reactstrap syntax to react-bootstrap syntax
    if ([undefined, null].includes(closeLabel) && ![undefined, null].includes(closeAriaLabel)) {
      closeLabel = closeAriaLabel;
    }

    if ([undefined, null].includes(closeButton) && ![undefined, null].includes(toggle)) {
      closeButton = true;

      if ([undefined, null].includes(onHide)) {
        onHide = toggle;
      }
    }

    if (closeButton && [undefined, null].includes(onHide) && ![undefined, null].includes(toggle)) {
      onHide = toggle;
    }

    if ([undefined, null].includes(closeLabel)) {
      closeLabel = 'Close';
    }

    if ([undefined, null].includes(closeButton)) {
      closeButton = false;
    }

    // Title passed in as child matches reactstrap style
    return (
      <ReactBootstrapModal.Header closeLabel={closeLabel} closeButton={closeButton} onHide={onHide} {...otherProps}>
        {title && (
          <ReactBootstrapModal.Title>{title}</ReactBootstrapModal.Title>
        )}
      </ReactBootstrapModal.Header>
    );
  }
}
