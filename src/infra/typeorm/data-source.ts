import vars from '$/vars';
import { DataSource } from 'typeorm';

export const typeormDataSource = new DataSource({
  type: 'postgres',
  synchronize: false,
  logging: vars.app.env !== 'production',
  entities: ['./entities/*.ts'],
  replication: {
    master: { url: vars.db.postgresWriter },
    slaves: [{ url: vars.db.postgresReader }],
  },
});