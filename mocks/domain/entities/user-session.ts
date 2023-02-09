import { UserSession } from '$/domain/entities/user-session';

export const mockUserSession: UserSession = {
  id: 'id',
  timestamp: new Date(),
  createdAt: new Date(),
  removedAt: undefined,
  userId: 'userId',
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
};