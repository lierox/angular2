import { Meteor } from 'meteor/meteor';
import { Comments } from '../../../both/collections/comments.collection';

Meteor.publish('comments', () => Comments.find());
