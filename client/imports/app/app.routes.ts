import { Route } from '@angular/router';
import { Meteor } from 'meteor/meteor';

import { UsersListComponent } from './users/users-list.component';
import { UserDetailsComponent } from './users/user-details.component';
import { RegisterFormComponent } from './auth/register-form.component';
import { LoginFormComponent } from './auth/login-form.component';
import { ImagesUploadComponent } from './images/images-upload.component';

export const routes: Route[] = [
  //{ path: '', redirectTo: '/images', pathMatch: 'full' },
  { path: 'images', component: ImagesUploadComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'user', component: UsersListComponent, canActivate: ['canActivateForLoggedIn'] },
  { path: 'user/:userId', component: UserDetailsComponent, canActivate: ['canActivateForManager'] }
];

export const ROUTES_PROVIDERS = [
{
  provide: 'canActivateForLoggedIn',
  useValue: () => !! Meteor.userId()
},
{
  provide: 'canActivateForManager',
  useValue: () => !! Meteor.userId()
}
];
