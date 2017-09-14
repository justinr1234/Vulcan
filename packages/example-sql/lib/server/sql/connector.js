let knex = () => {};
let environments = () => {};
if (Meteor.isServer) {
  knex = require('knex');
  environments = require('../../../knexdata');
}

// eslint-disable-next-line import/namespace
module.exports = knex(environments[process.env.NODE_ENV]);
