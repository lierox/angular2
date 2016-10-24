import { MongoObservable } from 'meteor-rxjs';

import { Topic } from '../models/topic.model';

export const Topics = new MongoObservable.Collection<Topic>('topic');
