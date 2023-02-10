import { UserConfirm } from '../entities/user-confirm';
import { Entity } from '../generics/entity';

/**
 * @alias [CSU003] Confirm email
 * @see https://github.com/leandroluk/undef-api-auth/wiki/%5BCSU003%5D-Confirm-email
 */
export type ConfirmEmailUseCase = {
  confirm(data: ConfirmEmailUseCase.Data): Promise<void>;
};
export namespace ConfirmEmailUseCase {
  export type Data = {
    body: Omit<UserConfirm, keyof Entity | 'expiresIn'>;
  };
}