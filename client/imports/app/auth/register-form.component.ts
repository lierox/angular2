import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, CanActivate } from '@angular/router';

import template from './register-form.component.html';

@Component({
  selector: 'register-form',
  template
})
export class RegisterFormComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      userType:['', Validators.required]
    });
  }

  ngOnDestroy() {
  }

  register() :void{
    let self = this.router;
    if (this.registerForm.valid) {
        Accounts.createUser({
            email: this.registerForm.value.email,
            password: this.registerForm.value.password,
            profile:{
                userType: this.registerForm.value.userType
            }
        },function(error){
            if(error){

            }else{
                self.navigate(['/user']);
            }
        });
    }
  }

}
