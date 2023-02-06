import { Entity } from '../generics/entity';
import { User } from './user';

export type UserReset = Entity & {
  userId: User['id'];
  password: User['password'];
  code: string;
  expiresIn: Date;
};