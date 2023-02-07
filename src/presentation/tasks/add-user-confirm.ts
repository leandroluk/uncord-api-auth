import { UserConfirm } from '$/domain/entities/user-confirm';

export type AddUserConfirmTask = {
  add(data: AddUserConfirmTask.Data): Promise<AddUserConfirmTask.Result>;
};
export namespace AddUserConfirmTask {
  export type Data = Pick<UserConfirm, 'userId'>;
  export type Result = UserConfirm;
}