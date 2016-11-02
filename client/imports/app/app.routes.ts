import { Route } from '@angular/router';
import { Meteor } from 'meteor/meteor';

import { UsersListComponent } from './users/users-list.component';
import { UserDetailsComponent } from './users/user-details.component';


export const routes: Route[] = [
  { path: '', redirectTo: '/user', pathMatch: 'full' },
  { path: 'user', component: UsersListComponent },
  { path: 'user/:userId', component: UserDetailsComponent, canActivate: ['canActivateForLoggedIn'] }
];

export const ROUTES_PROVIDERS = [{
  provide: 'canActivateForLoggedIn',
  useValue: () => !! Meteor.userId()
}];
