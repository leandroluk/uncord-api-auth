import { User } from '../entities/user';

/**
 * @see https://github.com/leandroluk/undef-api-auth/wiki/%5BCSU007%5D-Send-reset-password-email
 */
export type SendResetPasswordEmail = {
  send(data: SendResetPasswordEmail.Data): Promise<void>;
};
export namespace SendResetPasswordEmail {
  export type Data = Pick<User, 'email'>;
}