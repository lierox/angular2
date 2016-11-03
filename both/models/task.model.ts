import { CollectionObject } from './collection-object.model';

export interface Task extends CollectionObject {
  description: string;
  to: string;
  from: string;
  date: Date;
  done: boolean;
}
