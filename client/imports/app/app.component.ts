import { Component, NgZone } from '@angular/core';
import { InjectUser } from 'angular2-meteor-accounts-ui';
import template from './app.component.html';
import { Meteor } from 'meteor/meteor';
import { Router, CanActivate } from '@angular/router';

import { Tracker } from 'meteor/tracker';


@Component({
  selector: 'app',
  template
})

export class AppComponent {
    currentUser: Meteor.User;
    autorunComputation: Tracker.Computation;
    user : string;
    constructor(private router: Router,private zone: NgZone) {
      this._initAutorun();
    }

    ngOnInit(){

    }
    ngOnDestroy(){
    }

    logout(){
        let self = this.router;
        Meteor.logout(function(err){
            if(err){

            }else{
                self.navigate(['/login']);
            }
        });
        this.user = '';
    }
    _initAutorun(): void {
      this.autorunComputation = Tracker.autorun(() => {
        this.zone.run(() => {
          this.currentUser = Meteor.user();
          if(this.currentUser){
            this.user = this.currentUser['emails'][0]['address'];
          }
        })
      });
    }
}
