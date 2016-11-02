import { Meteor } from 'meteor/meteor';
import { Tasks } from '../../../both/collections/tasks.collection';

Meteor.publish('tasks', () => Tasks.find());
