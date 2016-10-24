import { Meteor } from 'meteor/meteor';
import './imports/publications/topics';
import './imports/publications/comments';

import { load } from './imports/fixtures/comments';

Meteor.startup(() => {
  load();
});
