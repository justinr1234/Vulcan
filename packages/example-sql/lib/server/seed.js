/*

 Seed the database with some dummy content.

 */

import Counters from '../modules/counters/collection.js';
import Users from 'meteor/vulcan:users';
import { newMutation } from 'meteor/vulcan:core';

const seedData = [
  {
    amount: 3,
  },
];

const createUser = function (username, email) {
  const user = {
    username,
    email,
    isDummy: true
  };
  newMutation({
    collection: Users,
    document: user,
    validate: false
  });
}

var createDummyUsers = function () {
  console.log('// inserting dummy users…');
  createUser('Bruce', 'dummyuser1@telescopeapp.org');
  createUser('Arnold', 'dummyuser2@telescopeapp.org');
  createUser('Julia', 'dummyuser3@telescopeapp.org');
};

Meteor.startup(function () {
  if (Users.find().fetch().length === 0) {
    createDummyUsers();
  }
  const currentUser = Users.findOne(); // just get the first user available
  if (Counters.find().fetch().length === 0) {
    console.log('// creating dummy counters');
    seedData.forEach(document => {
      newMutation({
        action: 'counters.new',
        collection: Counters,
        document: document,
        currentUser: currentUser,
        validate: false
      });
    });
  }
});