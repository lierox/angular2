import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { InjectUser } from 'angular2-meteor-accounts-ui';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';

import { Users } from '../../../../both/collections/users.collection';
import { User } from '../../../../both/models/user.model';

import template from './users-list.component.html';

@Component({
  selector: 'users-list',
  template
})

@InjectUser('user')
export class UsersListComponent implements OnInit, OnDestroy {
   users: Observable<User[]>;
   usersSub: Subscription;
   user: Meteor.User;

  ngOnInit() {
    this.users = Users.find({}).zone();
    this.usersSub = MeteorObservable.subscribe('users').subscribe();
  }

  ngOnDestroy() {
     this.usersSub.unsubscribe();
   }
}
