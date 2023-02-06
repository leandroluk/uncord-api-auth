import { AuthorizedHeader } from '../generics/authorized-header';

/**
 * @see https://github.com/leandroluk/undef-api-auth/wiki/%5BCSU005%5D-Authorize-request
 */
export type AuthorizeToken = {
  authorize(data: AuthorizeToken.Data): Promise<void>;
};
export namespace AuthorizeToken {
  export type Data = {
    headers: AuthorizedHeader;
  };
}