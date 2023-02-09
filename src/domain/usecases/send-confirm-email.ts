import { User } from '../entities/user';

/**
 * @alias [CSU002] Send confirm email
 * @see https://github.com/leandroluk/undef-api-auth/wiki/%5BCSU002%5D-Send-confirm-email
 */
export type SendConfirmEmail = {
  send(data: SendConfirmEmail.Data): Promise<void>;
};
export namespace SendConfirmEmail {
  export type Data = {
    body: Pick<User, 'email'>;
  };
}