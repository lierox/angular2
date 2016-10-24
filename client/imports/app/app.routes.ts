import { Route } from '@angular/router';
import { Meteor } from 'meteor/meteor';

import { TopicsListComponent } from './topics/topics-list.component';
import { TopicDetailsComponent } from './topics/topic-details.component';


export const routes: Route[] = [
  { path: '', redirectTo: '/topic', pathMatch: 'full' },
  { path: 'topic', component: TopicsListComponent },
  { path: 'topic/:topicId', component: TopicDetailsComponent, canActivate: ['canActivateForLoggedIn'] }
];

export const ROUTES_PROVIDERS = [{
  provide: 'canActivateForLoggedIn',
  useValue: () => !! Meteor.userId()
}];
