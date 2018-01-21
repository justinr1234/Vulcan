import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { STATES } from 'meteor/vulcan:accounts';

const UsersAccountMenu = ({state}) =>

  <Components.Dropdown id="accounts-dropdown" className="users-account-menu">
    <Components.DropdownToggle>
      <Components.Icon name="user"/>
      <FormattedMessage id="users.sign_up_log_in"/>
    </Components.DropdownToggle>
    <Components.DropdownMenu>
      <Components.AccountsLoginForm formState={state? STATES[state] : STATES.SIGN_UP} />
    </Components.DropdownMenu>
  </Components.Dropdown>

UsersAccountMenu.displayName = "UsersAccountMenu";

registerComponent('UsersAccountMenu', UsersAccountMenu);
