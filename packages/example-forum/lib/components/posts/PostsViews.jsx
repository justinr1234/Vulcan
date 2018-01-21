import { registerComponent, withCurrentUser, Utils, Components } from 'meteor/vulcan:core';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'meteor/vulcan:i18n';
import { withRouter } from 'react-router'
import Users from 'meteor/vulcan:users';

const PostsViews = (props, context) => {

  let views = ['top', 'new', 'best'];
  const adminViews = ['pending', 'rejected', 'scheduled'];

  if (Users.canDo(props.currentUser, 'posts.edit.all')) {
    views = views.concat(adminViews);
  }

  const query = _.clone(props.router.location.query);

  return (
    <div className="posts-views">
      <Components.DropdownButton
        bsStyle="default"
        className="views btn-secondary"
        title={context.intl.formatMessage({id: 'posts.view'})}
        id="views-dropdown"
      >
        {views.map(view =>
          <Components.LinkContainer key={view} to={{pathname: Utils.getRoutePath('posts.list'), query: {...query, view: view}}} className="dropdown-item">
            <Components.MenuItem>
              <FormattedMessage id={"posts."+view}/>
            </Components.MenuItem>
          </Components.LinkContainer>
        )}
        <Components.LinkContainer to="/daily" className="dropdown-item">
          <Components.MenuItem className="bar">
            <FormattedMessage id="posts.daily"/>
          </Components.MenuItem>
        </Components.LinkContainer>
      </Components.DropdownButton>
    </div>
  )
}

PostsViews.propTypes = {
  currentUser: PropTypes.object,
  defaultView: PropTypes.string
};

PostsViews.defaultProps = {
  defaultView: 'top'
};

PostsViews.contextTypes = {
  currentRoute: PropTypes.object,
  intl: intlShape
};

PostsViews.displayName = 'PostsViews';

registerComponent('PostsViews', PostsViews, withCurrentUser, withRouter);
