import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { InjectUser } from 'angular2-meteor-accounts-ui';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';
import { SortablejsOptions } from 'angular-sortablejs';

import { Users } from '../../../../both/collections/users.collection';
import { User } from '../../../../both/models/user.model';

import template from './users-list.component.html';

@Component({
  selector: 'users-list',
  template
})

@InjectUser('user')
export class UsersListComponent implements OnInit, OnDestroy {

   items = [1, 2, 3, 4, 5];
   numbers = [6, 7, 8 ,9 ,10];
   users: Observable<User[]>;
   usersSub: Subscription;
   user: Meteor.User;
   itemsOptions: SortablejsOptions = {
    animation: 150
  };
  ngOnInit() {
    this.users = Users.find({}).zone();
    this.usersSub = MeteorObservable.subscribe('users').subscribe();
  }

  ngOnDestroy() {
     this.usersSub.unsubscribe();
   }
}
