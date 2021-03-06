import { CollectionObject } from './collection-object.model';

export interface Comment extends CollectionObject {
  description: string;
  owner?: string;
  date: Date;
}
