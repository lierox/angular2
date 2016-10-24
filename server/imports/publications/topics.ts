import { Meteor } from 'meteor/meteor';
import { Topics } from '../../../both/collections/topics.collection';

Meteor.publish('topics', function() {
  const selector = {
    $or: [{
      // party is public
      public: true
    },
    // or
    /*{
      // current user is the owner
      $and: [{
        owner: this.userId
      }, {
        owner: {
          $exists: true
        }
      }]
    }*/]
  };

  return Topics.find(selector);
});
