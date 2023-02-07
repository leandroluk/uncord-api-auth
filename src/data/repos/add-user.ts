import { User } from '$/domain/entities/user';

export type AddUserRepo = {
  add(data: AddUserRepo.Data): Promise<void>;
};
export namespace AddUserRepo {
  export type Data = User;
}