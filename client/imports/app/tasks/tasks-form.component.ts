import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Meteor } from 'meteor/meteor';

import { Tasks } from '../../../../both/collections/tasks.collection';

//
import { Users } from '../../../../both/collections/users.collection';
import { User } from '../../../../both/models/user.model';
//

import template from './tasks-form.component.html';

@Component({
  selector: 'tasks-form',
  template
})
export class TasksFormComponent implements OnInit {
  addForm: FormGroup;
  from: string;
  //
  userId: string;
  paramsSub: Subscription;
  user: User;
  //
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
      //
      this.paramsSub = this.route.params
      .map(params => params['userId'])
      .subscribe(userId => {
       this.userId = userId

       this.user = Users.findOne(this.userId);
     });
      //

    this.addForm = this.formBuilder.group({
      description: ['', Validators.required]
    });
    this.from = Meteor.user()['emails'][0]['address'];
  }

  ngOnDestroy() {
      this.paramsSub.unsubscribe();
  }

  addTask(): void {

    if(!Meteor.userId()) {
        alert('Please log in to add a party');
        return;
    }

    if (this.addForm.valid) {
      Tasks.insert({description: this.addForm.value.description, to: this.user['emails'][0]['address'], from: this.from, date: new Date(), state:"waiting"});

      this.addForm.reset();
    }
  }
}
