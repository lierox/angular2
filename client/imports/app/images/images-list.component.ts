import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';

import { Images } from '../../../../both/collections/images.collection';
import template from './images-list.component.html';

@Component({
  selector: 'images-list',
  template
})

export class ImagesListComponent implements OnInit, OnDestroy {

   imagesSubs: Subscription;
   constructor(
    ) {}

  ngOnInit() {
    this.imagesSubs = MeteorObservable.subscribe('images').subscribe();
    let image = Images.findOne({"name" : "images.jpg"});
  }

  ngOnDestroy() {
     this.imagesSubs.unsubscribe();
   }
}
