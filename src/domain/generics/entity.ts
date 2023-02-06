import { Updatable } from './updatable';

export type Entity = Updatable & {
  createdAt: Date;
  removedAt?: Date;
};