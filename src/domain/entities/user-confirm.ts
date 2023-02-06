import { Entity } from '../generics/entity';
import { User } from './user';

export type UserConfirm = Entity & {
  userId: User['id'];
  code: string;
  expiresIn: Date;
};