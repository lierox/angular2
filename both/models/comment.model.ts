import { CollectionObject } from './collection-object.model';

export interface Comment extends CollectionObject {
  topic_id: string;
  description: string;
  owner?: string;
}
