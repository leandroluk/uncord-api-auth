import { UserConfirm } from '../entities/user-confirm';
import { Indexable } from '../generics/indexable';

/**
 * @alias [CSU003] Confirm email
 * @see https://github.com/leandroluk/undef-api-auth/wiki/%5BCSU003%5D-Confirm-email
 */
export type ConfirmEmail = {
  confirm(data: ConfirmEmail.Data): Promise<void>;
};
export namespace ConfirmEmail {
  export type Data = {
    body: Omit<UserConfirm, keyof Indexable | 'expiresIn'>;
  };
}