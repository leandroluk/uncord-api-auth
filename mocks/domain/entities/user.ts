import { User } from '$/domain/entities/user';

export const mockUser: User = {
  id: 'id',
  timestamp: new Date(),
  createdAt: new Date(),
  removedAt: undefined,
  email: 'email',
  password: 'password',
};