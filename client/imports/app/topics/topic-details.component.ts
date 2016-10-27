import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';

import 'rxjs/add/operator/map';

import template from './topic-details.component.html';

import { Topics } from '../../../../both/collections/topics.collection';
import { Topic } from '../../../../both/models/topic.model';

///////////////////////////////
import { Comments } from '../../../../both/collections/comments.collection';
import { Comment } from '../../../../both/models/comment.model';
///////////////////////////////

@Component({
    selector: 'topic-details',
    template
})
export class TopicDetailsComponent implements OnInit, OnDestroy{
    topicId: string;
    paramsSub: Subscription;
    topic: Topic;
    //
    comments: Observable<Comment[]>;
    commentsSub: Subscription;
    //

    constructor(
        private route: ActivatedRoute
    ){}

    ngOnInit() {
        this.paramsSub = this.route.params
        .map(params => params['topicId'])
        .subscribe(topicId => {
         this.topicId = topicId

         this.topic = Topics.findOne(this.topicId);
       });

       //
       this.comments = Comments.find({topic_id:this.topicId}).zone();
       this.commentsSub = MeteorObservable.subscribe('comments').subscribe();
       //
    }

    ngOnDestroy() {
        this.paramsSub.unsubscribe();
        this.commentsSub.unsubscribe();
    }

    removeComment(comment: Comment): void {
        if(!Meteor.userId()) {
            alert('Please log in to remove a party');
            return;
        }

        if(Meteor.user()['emails'][0]['address']!==comment.owner) {
            alert('Comment does not belog to you');
            return;
        }
        Comments.remove(comment._id);
    }
}
