import { Meteor } from 'meteor/meteor';
import { Thumbs, Images } from '../../../both/collections/images.collection';

//removed thumb publish with paramter

Meteor.publish('images', function() {
  return Images.collection.find({});
});

Meteor.publish('thumbs', function() {
  return Thumbs.collection.find({});
});
