import { AuthorizedHeader } from '../generics/authorized-header';
import { Entity } from '../generics/entity';
import { UserProfile } from '../models/user-profile';

/**
 * @see https://github.com/leandroluk/undef-api-auth/wiki/%5BCSU010%5D-Edit-*UserProfile*
 */
export type EditUserProfile = {
  edit(data: EditUserProfile.Data): Promise<void>;
};
export namespace EditUserProfile {
  export type Data = {
    headers: AuthorizedHeader;
    body: Partial<Omit<UserProfile, keyof Entity | 'photoURL'>>;
  };
}