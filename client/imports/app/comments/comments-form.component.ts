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
  topicId: string;
  paramsSub: Subscription;
  owner: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
      this.paramsSub = this.route.params
      .map(params => params['topicId'])
      .subscribe(topicId => {
       this.topicId = topicId
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
      Comments.insert({topic_id: this.topicId, description: this.addForm.value.description, owner:this.owner});

      this.addForm.reset();
    }
  }
}
