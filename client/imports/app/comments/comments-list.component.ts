import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Comments } from '../../../../both/collections/comments.collection';
import { Comment } from '../../../../both/models/comment.model';

import template from './comments-list.component.html';

@Component({
  selector: 'comments-list',
  template
})

export class CommentsListComponent {
   comments: Observable<Comment[]>;
  //TODO: Observer and zone documentation
  constructor() {
    this.comments = Comments.find({}).zone();
  }

  removeComment(comment: Comment): void {
    
    Comments.remove(comment._id);
  }
}
