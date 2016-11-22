import {Component, OnInit, EventEmitter, Output} from '@angular/core';

import template from './images-upload.component.html';

import { upload } from '../../../../both/methods/images.methods';
import {Subject, Subscription, Observable} from "rxjs";
import {MeteorObservable} from "meteor-rxjs";
import {Thumb} from "../../../../both/models/image.model";
import {Thumbs} from "../../../../both/collections/images.collection";
import { Images } from '../../../../both/collections/images.collection';
import { Image } from '../../../../both/models/image.model';

@Component({
  selector: 'images-upload',
  template
})
export class ImagesUploadComponent implements OnInit {
  fileIsOver: boolean = false;
  uploading: boolean = false;
  filesArray: string[] = [];
  files: Subject<string[]> = new Subject<string[]>();
  thumbsSubscription: Subscription;
  thumbs: Observable<Thumb[]>;
  @Output() onFile: EventEmitter<string> = new EventEmitter<string>();

  imagesSubs: Subscription;
  images: Observable<Image[]>;
   image: Image;
   thumb : Thumb;
  constructor() {}

  ngOnInit() {
      //removed sub with parameter part
    this.imagesSubs = MeteorObservable.subscribe('images').subscribe();
    this.imagesSubs = MeteorObservable.subscribe('thumbs').subscribe();
    this.thumbs = Thumbs.find({});
    this.images = Images.find({});
  }

  fileOver(fileIsOver: boolean): void {
    this.fileIsOver = fileIsOver;
  }

  onFileDrop(file: File): void {
    this.uploading = true;

    upload(file)
      .then((result) => {
        this.uploading = false;
        this.addFile(result);
      })
      .catch((error) => {
        this.uploading = false;
        console.log(`Something went wrong!`, error);
      });
  }

  addFile(file) {
    this.filesArray.push(file._id);
    this.files.next(this.filesArray);
    this.onFile.emit(file._id);
  }

  reset() {
    this.filesArray = [];
    this.files.next(this.filesArray);
  }
}
