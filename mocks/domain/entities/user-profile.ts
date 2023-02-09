import { UserProfile } from '$/domain/entities/user-profile';

export const mockUserProfile: UserProfile = {
  id: 'id',
  timestamp: new Date(),
  name: 'name',
  userId: 'userId',
  city: 'city',
  complement: 'complement',
  country: 'country',
  number: 'number',
  photoURL: 'photoURL',
  place: 'place',
  state: 'state',
  zipCode: 'zipCode0', // need 8 characters
};