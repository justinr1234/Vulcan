import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { Meteor } from 'meteor/meteor';
import Users from 'meteor/vulcan:users';
import { withApollo } from 'react-apollo';

const UsersMenu = ({currentUser, client}) =>
  <div className="users-menu">
    <Components.Dropdown id="user-dropdown">
      <Components.DropdownToggle>
        <Components.UsersAvatar size="small" user={currentUser} addLink={false} />
        <div className="users-menu-name">{Users.getDisplayName(currentUser)}</div>
      </Components.DropdownToggle>
      <Components.DropdownMenu>
        <Components.LinkContainer to={`/users/${currentUser.slug}`}>
          <Components.MenuItem className="dropdown-item" eventKey="1"><FormattedMessage id="users.profile"/></Components.MenuItem>
        </Components.LinkContainer>
        <Components.LinkContainer to={`/account`}>
          <Components.MenuItem className="dropdown-item" eventKey="2"><FormattedMessage id="users.edit_account"/></Components.MenuItem>
        </Components.LinkContainer>

        <Components.LinkContainer to={`/admin`}>
          <Components.MenuItem className="dropdown-item" eventKey="2">Admin</Components.MenuItem>
        </Components.LinkContainer>
        <Components.MenuItem className="dropdown-item" eventKey="4" onClick={() => Meteor.logout(() => client.resetStore())}><FormattedMessage id="users.log_out"/></Components.MenuItem>
      </Components.DropdownMenu>
    </Components.Dropdown>
  </div>


UsersMenu.propsTypes = {
  currentUser: PropTypes.object,
  client: PropTypes.object,
};

registerComponent('UsersMenu', UsersMenu, withCurrentUser, withApollo);
