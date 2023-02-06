import { Indexable } from '../generics/indexable';
import { User } from './user';

export type UserReset = Indexable & {
  userId: User['id'];
  password: User['password'];
  code: string;
  expiresIn: Date;
};