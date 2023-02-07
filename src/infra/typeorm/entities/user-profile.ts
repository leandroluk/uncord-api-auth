import { UserProfile } from '$/domain/entities/user-profile';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TABLE_USER_PROFILE } from '../constants';

@Entity(TABLE_USER_PROFILE)
export class UserProfileEntity implements UserProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamptz' })
  timestamp: Date;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column({ length: 100 })
  name: string;

  @Column({ name: 'photo_url', nullable: true })
  photoURL?: string;

  @Column({ length: 50, nullable: true })
  country?: string;

  @Column({ length: 50, nullable: true })
  state?: string;

  @Column({ length: 50, nullable: true })
  city?: string;

  @Column({ length: 100, nullable: true })
  place?: string;

  @Column({ length: 50, nullable: true })
  number?: string;

  @Column({ length: 50, nullable: true })
  complement?: string;

  @Column({ name: 'zip_code', type: 'char', length: 8 })
  zipCode?: string;
}