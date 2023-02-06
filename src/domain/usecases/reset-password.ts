import { Indexable } from '../generics/indexable';
import { UserReset } from '../models/user-reset';

/**
 * @see https://github.com/leandroluk/undef-api-auth/wiki/%5BCSU008%5D-Reset-password
 */
export type ResetPassword = {
  reset(data: ResetPassword.Data): Promise<void>;
};
export namespace ResetPassword {
  export type Data = {
    body: Omit<UserReset, keyof Indexable | 'expiresIn'>;
  };
}