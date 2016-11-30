import { Component, NgZone } from '@angular/core';
import { InjectUser } from 'angular2-meteor-accounts-ui';
import template from './app.component.html';
import { Meteor } from 'meteor/meteor';
import { Router, CanActivate } from '@angular/router';

import { Tracker } from 'meteor/tracker';
import { TranslateService } from './translate';


@Component({
  selector: 'app',
  template
})

export class AppComponent {
    currentUser: Meteor.User;
    autorunComputation: Tracker.Computation;
    user : string;

    public translatedText: string;
    public supportedLangs: any[];

    constructor(private router: Router,private zone: NgZone, private _translate: TranslateService) {
      this._initAutorun();
    }

    ngOnInit(){
        this.user='';

        // standing data
      this.supportedLangs = [
          { display: 'English', value: 'en' },
          { display: 'Turkish', value: 'tr' }
      ];

      // set current langage
      this.selectLang('tr');
    }

    isCurrentLang(lang: string) {
          // check if the selected lang is current lang
          return lang === this._translate.currentLang;
      }

      selectLang(lang: string) {
          // set current lang;
          this._translate.use(lang);
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
