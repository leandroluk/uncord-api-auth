import { AuthorizedHeader } from '../generics/authorized-header';
import { File } from '../generics/File';

/**
 * @see https://github.com/leandroluk/undef-api-auth/wiki/%5BCSU011%5D-Add-*UserProfile*-photo
 */
export type AddUserProfilePhoto = {
  add(data: AddUserProfilePhoto.Data): Promise<void>;
};
export namespace AddUserProfilePhoto {
  export type Data = {
    headers: AuthorizedHeader;
    file: File;
  };
}