import { Entity } from '../generics/entity';

export type User = Entity & {
  email: string;
  password: string;
};