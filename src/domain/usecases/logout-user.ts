import { AuthorizedHeader } from '../generics/authorized-header';

/**
 * @alias [CSU009] Logout *User*
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