import { Comments } from '../../../both/collections/comments.collection';
import { Comment } from '../../../both/models/comment.model';

export function load() {
  if (Comments.find().cursor.count() === 0) {
    const parties: Comment[] = [{
      topic_id: "-101",
      description: 'Can we please just for an evening not listen to dubstep.'
    }, {
      topic_id: "-102",
      description: 'Get it on!',
    }, {
      topic_id: "-103",
      description: 'Leisure suit required. And only fiercest manners.',
    }];

     parties.forEach((comment: Comment) => Comments.insert(comment));
  }
}
