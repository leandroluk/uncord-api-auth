import { User } from '../entities/user';

/**
 * @alias [CSU001] Register *User*
 * @see https://github.com/leandroluk/undef-api-auth/wiki/%5BCSU001%5D-Register-*User*
 */
export type RegisterUserUseCase = {
  register(data: RegisterUserUseCase.Data): Promise<void>;
};
export namespace RegisterUserUseCase {
  export type Data = {
    body: Pick<User, 'email'>;
  };
}