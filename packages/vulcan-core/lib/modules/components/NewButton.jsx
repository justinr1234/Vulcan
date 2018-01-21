import { Components, registerComponent } from 'meteor/vulcan:lib';
import React from 'react';
import { FormattedMessage, intlShape } from 'meteor/vulcan:i18n';

const NewButton = ({ collection, bsStyle = 'primary' }, {intl}) =>
  <Components.ModalTrigger 
    label={intl.formatMessage({id: 'datatable.new'})} 
    component={<Components.Button bsStyle={bsStyle}><FormattedMessage id="datatable.new" /></Components.Button>}
  >
    <Components.DatatableNewForm collection={collection} />
  </Components.ModalTrigger>

NewButton.contextTypes = {
  intl: intlShape
};

NewButton.displayName = 'NewButton';

registerComponent('NewButton', NewButton);