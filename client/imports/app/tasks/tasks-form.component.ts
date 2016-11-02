import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Meteor } from 'meteor/meteor';

import { Tasks } from '../../../../both/collections/tasks.collection';

import template from './tasks-form.component.html';

@Component({
  selector: 'tasks-form',
  template
})
export class TasksFormComponent implements OnInit {
  addForm: FormGroup;
  from: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {

    this.addForm = this.formBuilder.group({
      description: ['', Validators.required],
      to: ['', Validators.required]
    });
    this.from = Meteor.user()['emails'][0]['address'];
  }

  ngOnDestroy() {
  }

  addTask(): void {

    if(!Meteor.userId()) {
        alert('Please log in to add a party');
        return;
    }

    if (this.addForm.valid) {
      Tasks.insert({description: this.addForm.value.description, to: this.addForm.value.to, from: this.from, date: new Date()});

      this.addForm.reset();
    }
  }
}
