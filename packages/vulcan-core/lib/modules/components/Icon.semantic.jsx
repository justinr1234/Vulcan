import { registerComponent, Utils } from 'meteor/vulcan:lib';
import React from 'react';
import { Icon } from 'semantic-ui-react';

const SemanticIcon = ({ name, iconClass, onClick }) => {
  icons = Utils.getIcons();
  const iconCode = !!icons[name] ? icons[name] : name;
  return <Icon name={iconCode} onClick={onClick} className={iconClass} aria-hidden="true" />;
}

SemanticIcon.displayName = "Icon";

export default SemanticIcon;
