import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import template from './login-form.component.html';

@Component({
  selector: 'login-form',
  template
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnDestroy() {
  }

  login() :void{
    if (this.loginForm.valid) {
        Meteor.loginWithPassword(this.loginForm.value.email, this.loginForm.value.password, function(error){
            console.log(error);
        });
    }
  }

}
