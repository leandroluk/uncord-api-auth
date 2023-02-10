import { UserConfirm } from '$/domain/entities/user-confirm';

export type ResetUserConfirmTask = {
  reset(id: ResetUserConfirmTask.Id): Promise<ResetUserConfirmTask.Result>;
};
export namespace ResetUserConfirmTask {
  export type Id = UserConfirm['id'];
  export type Result = UserConfirm;
}