/*

The main Counters collection definition file.

*/

import { createCollection, getDefaultResolvers, getDefaultMutations } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import schema from './schema.js';

/*

 Counters collection definition

*/
const Counters = createCollection({

  collectionName: 'Counters',

  typeName: 'Counter',

  schema,
  
  resolvers: getDefaultResolvers('Counters'),

  mutations: getDefaultMutations('Counters'),

});

/*

Permissions for members (regular users)

*/
const membersActions = [
  'counters.new',
  'counters.edit.own',
  'counters.remove.own',
];
Users.groups.members.can(membersActions);

/*

Default sort

*/
Counters.addDefaultView(terms => ({
  options: {
    sort: {
      createdAt: -1
    }
  }
}));

export default Counters;
