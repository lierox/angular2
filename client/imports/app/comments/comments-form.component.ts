import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Meteor } from 'meteor/meteor';

import { Comments } from '../../../../both/collections/comments.collection';

import template from './comments-form.component.html';

@Component({
  selector: 'comments-form',
  template
})
export class CommentsFormComponent implements OnInit {
  addForm: FormGroup;
  userId: string;
  paramsSub: Subscription;
  owner: string;
  date: Date;
  dateString: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
      this.paramsSub = this.route.params
      .map(params => params['userId'])
      .subscribe(userId => {
       this.userId = userId
     });

    this.addForm = this.formBuilder.group({
      description: ['', Validators.required]
    });
    this.owner = Meteor.user()['emails'][0]['address'];
  }

  ngOnDestroy() {
  }

  addComment(): void {
    if(!Meteor.userId()) {
        alert('Please log in to add a party');
        return;
    }

    if (this.addForm.valid) {
      Comments.insert({description: this.addForm.value.description, owner:this.owner, date:new Date()});

      this.addForm.reset();
    }
  }
}
