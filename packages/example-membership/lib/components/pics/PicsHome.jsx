/* 

Pics Home component

*/

import React from 'react';
import { registerComponent, Components, withCurrentUser } from 'meteor/vulcan:core';
import PicsList from './PicsList.jsx';
import Users from 'meteor/vulcan:users';

const PicsHome = ({results = [], currentUser, loading, loadMore, count, totalCount}) => {
  if (currentUser) {

    return (
      <div className="pics-list">

        {Users.canDo(currentUser, 'pics.view') ?

          <PicsList /> : 
        
          <Components.Checkout
            productKey="membership"
            associatedCollection={Users}
            associatedDocument={currentUser}
            fragmentName="UsersCurrent"
            button={<Components.Button bsStyle="primary">Buy membership</Components.Button>}
          />
        
        }

      </div>
    )

  } else {

    return (
      <div className="pics-list">
        <p>Please sign up or log in to access this content</p>
      </div>
    )

  }
  
};

registerComponent('PicsHome', PicsHome, withCurrentUser);