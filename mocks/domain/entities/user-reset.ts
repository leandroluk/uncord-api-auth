import { UserReset } from '$/domain/entities/user-reset';

export const mockUserReset: UserReset = {
  id: 'id',
  timestamp: new Date(),
  createdAt: new Date(),
  removedAt: undefined,
  userId: 'userId',
  code: 'code',
  password: 'password',
  expiresIn: new Date(),
};