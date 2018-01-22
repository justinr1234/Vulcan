import { registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import PostsNewButtonBootstrap3 from './PostsNewButton.bootstrap3.jsx';
import PostsNewButtonBootstrap4 from './PostsNewButton.bootstrap4.jsx';
import PostsNewButtonSemantic from './PostsNewButton.semantic.jsx';
// import React from 'react';
// import PropTypes from 'prop-types';
// import { FormattedMessage, intlShape } from 'meteor/vulcan:i18n';
// import Button from 'react-bootstrap/lib/Button';
//
// const PostsNewButton = (props, context) => {
//
//   const size = props.currentUser ? 'large' : 'small';
//   const button = <Button className="posts-new-button" bsStyle="primary"><Components.Icon name="new"/> <FormattedMessage id="posts.new_post"/></Button>;
//   return (
//     <Components.ModalTrigger size={size} title={context.intl.formatMessage({ id: 'posts.new_post' })} component={button}>
//       <Components.PostsNewForm />
//     </Components.ModalTrigger>
//   )
// }
//
// PostsNewButton.displayName = 'PostsNewButton';
//
// PostsNewButton.propTypes = {
//   currentUser: PropTypes.object,
// };
//
// PostsNewButton.contextTypes = {
//   messages: PropTypes.object,
//   intl: intlShape
// };

registerComponent('PostsNewButton', PostsNewButtonBootstrap3, withCurrentUser, { framework: 'bootstrap3' });
registerComponent('PostsNewButton', PostsNewButtonBootstrap4, withCurrentUser, { framework: 'bootstrap4' });
registerComponent('PostsNewButton', PostsNewButtonSemantic, withCurrentUser, { framework: 'semantic' });
