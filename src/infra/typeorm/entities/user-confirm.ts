import { UserConfirm } from '$/domain/entities/user-confirm';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TABLE_USER_CONFIRM } from '../constants';

@Entity(TABLE_USER_CONFIRM)
export class UserConfirmEntity implements UserConfirm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamptz' })
  timestamp: Date;

  @Column({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @Column({ name: 'removed_at', type: 'timestamptz', nullable: true })
  removedAt?: Date;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'code' })
  code: string;

  @Column({ name: 'expires_in', type: 'timestamptz' })
  expiresIn: Date;
}