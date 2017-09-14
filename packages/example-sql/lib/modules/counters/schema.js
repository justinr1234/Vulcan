import { addCallback } from 'meteor/vulcan:core';
import { Promise } from 'meteor/promise';

let CountFactory = function mockCountFactory() {};

if (Meteor.isServer) {
  CountFactory = require('./sql.js').default;
}

function countersNewSync(counter, user) {
  if (Meteor.isServer) {
    const Count = new CountFactory();
    console.log('about to async');
    const ret = Promise.await(Count.insertCount(counter.amount));
    console.log('ret was');
    console.log(ret);
    if (ret && ret.length) {
      counter._id = ret[0].toString();
      delete counter.amount;
      delete counter.createdAt;
      console.log('returning doc');
      console.log(counter);
    }
  }
  return counter;
}

addCallback("counters.new.sync", countersNewSync);

// async function countersNewAsync(counter, user, collection) {
//   if (Meteor.isServer) {
//     const Count = new CountFactory();
//     const ret = await Count.insertCount(counter.amount);
//     console.log('ret was');
//     console.log(ret);
//     if (ret && ret.length) {
//       collection.update(counter._id, {
//         $set: {
//           _id: ret[0].toString()
//         },
//         $unset: {
//           amount: "",
//           createdAt: "",
//           updatedAt: ""
//         }});
//     }
//   }
// }

// addCallback("counters.new.async", countersNewAsync);

async function countersEditSync(modifier, document, currentUser) {
  if (modifier.$set) {
    console.log('got $set modififer, running');
    const Count = new CountFactory();
    const ret = await Count.updateCountAmount(parseInt(document._id, 10), modifier.$set.amount);
    console.log('ret was');
    console.log(ret);
    delete modifier.$set.amount;
    delete modifier.$set.updatedAt;
  }
  if (modifier.$unset) {
    console.log('got $unset modifier, running');
    console.log(modifier.$unset);
    delete modifier.$unset.amount;
    delete modifier.$unset.updatedAt;
  }
  return modifier;
}

addCallback("counters.edit.sync", countersEditSync);

async function countersRemoveSync(counter, user) {
  if (Meteor.isServer) {
    const Count = new CountFactory();
    const ret = await Count.deleteCount(counter._id);
    if (ret && ret.length) {
      console.log('successfully deleted');
    }
  }
}

addCallback("counters.remove.sync", countersRemoveSync);


const schema = {

  // default properties

  _id: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
  },
  createdAt: {
    label: 'Created At',
    type: Date,
    optional: true,
    viewableBy: ['guests'],
    resolveAs: {
      fieldName: 'createdAt',
      type: 'Date',
      resolver: async (counter, args, context) => {
        if (Meteor.isServer) {
          const Count = new CountFactory();
          const ret = await Count.getCount(parseInt(counter._id, 10));
          if (ret && ret.length) {
            try {
              return new Date(ret[0].created_at);
            }
            catch (e) {
              console.log(e);
            }
          }
        }
      },
      addOriginalField: true
    }
  },
  updatedAt: {
    label: 'Updated At',
    type: Date,
    optional: true,
    viewableBy: ['guests'],
    resolveAs: {
      fieldName: 'updatedAt',
      type: 'Date',
      resolver: async (counter, args, context) => {
        if (Meteor.isServer) {
          const Count = new CountFactory();
          const ret = await Count.getCount(parseInt(counter._id, 10));
          if (ret && ret.length) {
            try {
              return new Date(ret[0].updated_at);
            }
            catch (e) {
              console.log(e);
            }
          }
        }
      },
      addOriginalField: true
    }
  },
  userId: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    resolveAs: {
      fieldName: 'user',
      type: 'User',
      resolver: (counter, args, context) => {
        return context.Users.findOne({ _id: counter.userId }, { fields: context.Users.getViewableFields(context.currentUser, context.Users) });
      },
      addOriginalField: true
    }
  },

  // custom properties

  amount: {
    label: 'Amount',
    type: Number,
    optional: true,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
    resolveAs: {
      fieldName: 'amount',
      type: 'Int',
      addOriginalField: true,
      resolver: async (counter, args, context) => {
        if (Meteor.isServer) {
          const Count = new CountFactory();
          if (counter && (counter._id)) {
            const ret = await Count.getCount(parseInt(counter._id, 10));
            if (ret && ret.length) {
              if (ret[0].amount) {
                return ret[0].amount;
              }
            }
          }
        }
      }
    }
  },
};

export default schema;
