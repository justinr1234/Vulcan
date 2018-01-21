import { Components, registerComponent } from 'meteor/vulcan:lib';
import React from 'react';
import { FormattedMessage, intlShape } from 'meteor/vulcan:i18n';

const EditButton = ({ collection, document, bsStyle = 'primary' }, {intl}) =>
  <Components.ModalTrigger 
    label={intl.formatMessage({id: 'datatable.edit'})} 
    component={<Components.Button bsStyle={bsStyle}><FormattedMessage id="datatable.edit" /></Components.Button>}
  >
    <Components.DatatableEditForm collection={collection} document={document} />
  </Components.ModalTrigger>

EditButton.contextTypes = {
  intl: intlShape
};

EditButton.displayName = 'EditButton';

registerComponent('EditButton', EditButton);