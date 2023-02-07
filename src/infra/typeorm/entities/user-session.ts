import { UserSession } from '$/domain/entities/user-session';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TABLE_USER_SESSION } from '../constants';

@Entity(TABLE_USER_SESSION)
export class UserSessionEntity implements UserSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamptz' })
  timestamp: Date;

  @Column({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @Column({ name: 'removed_at', type: 'timestamptz', nullable: true })
  removedAt?: Date;

  @Column({ name: 'access_token' })
  accessToken: string;

  @Column({ name: 'refresh_token' })
  refreshToken: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;
}