/* 

List of counters.
Wrapped with the "withList" and "withCurrentUser" containers.

*/

import React from 'react';
import Helmet from 'react-helmet';
import { Components, withList, withCurrentUser, registerComponent } from 'meteor/vulcan:core';

import Counters from '../../modules/counters/collection.js';

const CountersList = ({results = [], currentUser, loading, loadMore, count, totalCount}) =>
  
  <div style={{maxWidth: '500px', margin: '20px auto'}}>

    <Helmet>
      <link name="bootstrap" rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.5/css/bootstrap.min.css"/>
    </Helmet>

    {/* user accounts */}

    <div style={{padding: '20px 0', marginBottom: '20px', borderBottom: '1px solid #ccc'}}>
    
      <Components.AccountsLoginForm />
    
    </div>

    {loading ? 

      <Components.Loading /> :

      <div className="counters">
        
        {/* new document form */}

        {Counters.options.mutations.new.check(currentUser) ?
          <div style={{marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #ccc'}}>
            <h4>Insert New Document</h4>
            <Components.SmartForm collection={Counters} />
          </div> :
          null
        }

        {/* documents list */}

        {results.map(counter => <Components.Card fields={['amount', 'createdAt', 'updatedAt']} key={counter._id} collection={Counters} document={counter} currentUser={currentUser} />)}
        
        {/* load more */}

        {totalCount > results.length ?
          <a href="#" onClick={e => {e.preventDefault(); loadMore();}}>Load More ({count}/{totalCount})</a> : 
          <p>No more items.</p>
        }

      </div>
    }

  </div>

const options = {
  collection: Counters,
  limit: 5,
};

registerComponent('CountersList', CountersList, withCurrentUser, [withList, options]);
