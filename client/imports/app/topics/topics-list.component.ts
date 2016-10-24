import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { InjectUser } from 'angular2-meteor-accounts-ui';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';

import { Topics } from '../../../../both/collections/topics.collection';
import { Topic } from '../../../../both/models/topic.model';

import template from './topics-list.component.html';

@Component({
  selector: 'topics-list',
  template
})

@InjectUser('user')
export class TopicsListComponent implements OnInit, OnDestroy {
   topics: Observable<Topic[]>;
   topicsSub: Subscription;
   user: Meteor.User;

  ngOnInit() {
    this.topics = Topics.find({}).zone();
    this.topicsSub = MeteorObservable.subscribe('topics').subscribe();
  }

  ngOnDestroy() {
     this.topicsSub.unsubscribe();
   }
}
