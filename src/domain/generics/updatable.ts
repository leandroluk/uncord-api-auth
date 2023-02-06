import { Indexable } from './indexable';

export type Updatable = Indexable & {
  timestamp: string;
};