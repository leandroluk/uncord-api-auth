import { UserConfirm } from '$/domain/entities/user-confirm';

export type AddUserConfirmRepo = {
  add(data: AddUserConfirmRepo.Data): Promise<void>;
};
export namespace AddUserConfirmRepo {
  export type Data = UserConfirm;
}