import vars from '$/vars';
import { DataSource } from 'typeorm';
import { UserEntity } from './entities/user';
import { UserConfirmEntity } from './entities/user-confirm';
import { UserProfileEntity } from './entities/user-profile';
import { UserResetEntity } from './entities/user-reset';
import { UserSessionEntity } from './entities/user-session';

export const typeormDataSource = new DataSource({
  type: 'postgres',
  synchronize: false,
  logging: vars.app.env !== 'production',
  entities: [
    UserConfirmEntity,
    UserProfileEntity,
    UserResetEntity,
    UserSessionEntity,
    UserEntity,
  ],
  replication: {
    master: { url: vars.db.postgresWriter },
    slaves: [{ url: vars.db.postgresReader }],
  },
});