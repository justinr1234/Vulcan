import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Modal, Header } from 'semantic-ui-react';

const propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  component: PropTypes.object,
  size: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

const defaultProps = {
  size: 'large'
};

class ModalTrigger extends PureComponent {

  static propTypes = propTypes;

  static defaultProps = defaultProps;

  state = {
    modalIsOpen: false
  };

  openModal = () => {
    this.setState({
      modalIsOpen: true
    });
  };

  closeModal = () => {
    this.setState({
      modalIsOpen: false
    });
  };


  renderHeader() {
    return (
      <Header content={this.props.title} />
    )
  }

  render() {
    const triggerComponent = this.props.component ?
      React.cloneElement(this.props.component, { onClick: this.openModal }) :
      <a href="#" onClick={this.openModal}>{this.props.label}</a>;

    const childrenComponent = React.cloneElement(this.props.children, { closeModal: this.closeModal });
    return (
      <div className="modal-trigger">
        <Modal
          trigger={triggerComponent}
          className={this.props.className}
          size={this.props.size}
          open={this.state.modalIsOpen}
          onClose={this.closeModal}
        >
          {this.props.title ? this.renderHeader() : null}
          <Modal.Content>
            {childrenComponent}
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

export default ModalTrigger;
