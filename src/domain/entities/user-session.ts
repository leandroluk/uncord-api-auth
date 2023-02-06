import { BearerAuth } from '../generics/bearer-auth';
import { Entity } from '../generics/entity';
import { User } from './user';

export type UserSession = Entity & Omit<BearerAuth, 'type'> & {
  userId: User['id'];
};