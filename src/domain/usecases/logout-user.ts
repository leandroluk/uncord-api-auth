import { AuthorizedHeader } from '../generics/authorized-header';

/**
 * @see https://github.com/leandroluk/undef-api-auth/wiki/%5BCSU009%5D-Logout-*User*
 */
export type LogoutUser = {
  logout(data: LogoutUser.Data): Promise<void>;
};
export namespace LogoutUser {
  export type Data = {
    headers: AuthorizedHeader;
  };
}