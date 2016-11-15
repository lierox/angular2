import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, CanActivate } from '@angular/router';
import { Meteor } from 'meteor/meteor';

import template from './login-form.component.html';

@Component({
  selector: 'login-form',
  template
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  error: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private zone: NgZone
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.error = '';
  }

  ngOnDestroy() {
  }

  login() {
    let self = this.router;
    if (this.loginForm.valid) {
        Meteor.loginWithPassword(this.loginForm.value.email, this.loginForm.value.password, function(error){
          if (error) {
             //console.log(error); 
          } else {
            self.navigate(['/user']);
          }
        });
    }
  }
}
