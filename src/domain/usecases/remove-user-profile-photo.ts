import { AuthorizedHeader } from '../generics/authorized-header';

/**
 * @see https://github.com/leandroluk/undef-api-auth/wiki/%5BCSU012%5D-Remove-*UserProfile*-photo
 */
export type RemoveUserProfilePhoto = {
  remove(data: RemoveUserProfilePhoto.Data): Promise<void>;
};
export namespace RemoveUserProfilePhoto {
  export type Data = {
    headers: AuthorizedHeader;
  };
}