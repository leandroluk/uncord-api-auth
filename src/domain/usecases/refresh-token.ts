import { AuthorizedHeader } from '../generics/authorized-header';
import { BearerAuth } from '../generics/bearer-auth';

/**
 * @alias [CSU006] Refresh tokens
 * @see https://github.com/leandroluk/undef-api-auth/wiki/%5BCSU006%5D-Refresh-tokens
 */
export type RefreshToken = {
  refresh(data: RefreshToken.Data): Promise<RefreshToken.Result>;
};
export namespace RefreshToken {
  export type Data = {
    headers: AuthorizedHeader;
  };
  export type Result = BearerAuth;
}