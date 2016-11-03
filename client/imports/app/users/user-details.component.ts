import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';

import 'rxjs/add/operator/map';

import template from './user-details.component.html';

import { Users } from '../../../../both/collections/users.collection';
import { User } from '../../../../both/models/user.model';

///////////////////////////////
import { Comments } from '../../../../both/collections/comments.collection';
import { Comment } from '../../../../both/models/comment.model';
///////////////////////////////

///////////////////////////////
import { Tasks } from '../../../../both/collections/tasks.collection';
import { Task } from '../../../../both/models/task.model';
///////////////////////////////

@Component({
    selector: 'user-details',
    template
})
export class UserDetailsComponent implements OnInit, OnDestroy{
    userId: string;
    paramsSub: Subscription;
    user: User;
    //
    comments: Observable<Comment[]>;
    commentsSub: Subscription;
    //
    //
    tasks: Observable<Task[]>;
    tasksSub: Subscription;
    //

    constructor(
        private route: ActivatedRoute
    ){}

    ngOnInit() {
        this.paramsSub = this.route.params
        .map(params => params['userId'])
        .subscribe(userId => {
         this.userId = userId

         this.user = Users.findOne(this.userId);
       });

       //
       this.comments = Comments.find({owner:this.user['emails'][0]['address']}).zone();
       this.commentsSub = MeteorObservable.subscribe('comments').subscribe();
       //
       //
       this.tasks = Tasks.find({to:this.user['emails'][0]['address']}).zone();
       this.tasksSub = MeteorObservable.subscribe('tasks').subscribe();
       //
    }

    ngOnDestroy() {
        this.paramsSub.unsubscribe();
        this.commentsSub.unsubscribe();
        this.tasksSub.unsubscribe();
    }

    removeComment(comment: Comment): void {
        if(!Meteor.userId()) {
            alert('Please log in to remove a log');
            return;
        }

        if(Meteor.user()['emails'][0]['address']!==comment.owner) {
            alert('Log does not belog to you');
            return;
        }
        Comments.remove(comment._id);
    }

    removeTask(task: Task): void {
        if(!Meteor.userId()) {
            alert('Please log in to remove a task');
            return;
        }

        if(Meteor.user()['emails'][0]['address']!==task.from) {
            alert('Task does not assigned by you');
            return;
        }
        Tasks.remove(task._id);
    }

    setStateTask(task: Task): void {
        if(!Meteor.userId()) {
            alert('Please log in to change state of task');
            return;
        }

        if(Meteor.user()['emails'][0]['address']!==task.to) {
            alert('Task state cannot be changed by you');
            return;
        }
        Tasks.update(task._id, {
            $set: { done: !task.done },
        });
        console.log(task.done);
    }
}
