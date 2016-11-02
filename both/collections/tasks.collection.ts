import { MongoObservable } from 'meteor-rxjs';

import { Task } from '../models/task.model';

export const Tasks = new MongoObservable.Collection<Task>('task');

function loggedIn() {
  return !!Meteor.user();
}

Tasks.allow({
  insert: loggedIn,
  update: loggedIn,
  remove: loggedIn
});
