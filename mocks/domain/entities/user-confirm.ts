import { UserConfirm } from '$/domain/entities/user-confirm';

export const mockUserConfirm: UserConfirm = {
  id: 'id',
  timestamp: new Date(),
  createdAt: new Date(),
  removedAt: undefined,
  userId: 'userId',
  code: 'code',
  expiresIn: new Date(),
};