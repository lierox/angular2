import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import template from './register-form.component.html';

@Component({
  selector: 'register-form',
  template
})
export class RegisterFormComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnDestroy() {
  }

  register() :void{
    if (this.registerForm.valid) {
        Accounts.createUser({
            email: this.registerForm.value.email,
            password: this.registerForm.value.password
        },function(error){
            console.log(error);
        });
    }
  }

}
