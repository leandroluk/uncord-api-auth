import { Updatable } from '../generics/updatable';
import { User } from './user';

export type UserProfile = Updatable & {
  userId: User['id'];
  photoURL?: string;
  name: string;
  country?: string;
  state?: string;
  city?: string;
  place?: string;
  number?: string;
  complement?: string;
  zipCode?: string;
};