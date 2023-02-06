import { BearerAuth } from '../generics/bearer-auth';
import { User } from '../models/user';

/**
 * @see https://github.com/leandroluk/undef-api-auth/wiki/%5BCSU004%5D-Login-*User*
 */
export type LoginUser = {
  login(data: LoginUser.Data): Promise<LoginUser.Result>;
};
export namespace LoginUser {
  export type Data = {
    body: Pick<User, 'email' | 'password'>;
  };
  export type Result = BearerAuth;
}