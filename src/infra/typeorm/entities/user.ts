import { User } from '$/domain/entities/user';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TABLE_USER } from '../constants';

@Entity(TABLE_USER)
export class UserEntity implements User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamptz' })
  timestamp: Date;

  @Column({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @Column({ name: 'removed_at', type: 'timestamptz', nullable: true })
  removedAt?: Date;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ type: 'text' })
  password: string;
}