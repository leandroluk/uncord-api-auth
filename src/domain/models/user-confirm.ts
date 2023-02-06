import { Indexable } from '../generics/indexable';
import { User } from './user';

export type UserConfirm = Indexable & {
  userId: User['id'];
  code: string;
  expiresIn: Date;
};