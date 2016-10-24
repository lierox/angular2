import { CollectionObject } from './collection-object.model';

export interface Topic extends CollectionObject {
  name: string;
  public: boolean;
}
