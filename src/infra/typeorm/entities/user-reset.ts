import { UserReset } from '$/domain/entities/user-reset';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TABLE_USER_RESET } from '../constants';

@Entity(TABLE_USER_RESET)
export class UserResetEntity implements UserReset {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamptz' })
  timestamp: Date;

  @Column({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @Column({ name: 'removed_at', type: 'timestamptz', nullable: true })
  removedAt?: Date;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column()
  password: string;

  @Column()
  code: string;

  @Column({ name: 'expires_in', type: 'timestamptz' })
  expiresIn: Date;
}