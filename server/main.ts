import { Meteor } from 'meteor/meteor';
import './imports/publications/topics';
import './imports/publications/comments';
import './imports/publications/users';

import { load } from './imports/fixtures/comments';

Meteor.startup(() => {
  load();
});
