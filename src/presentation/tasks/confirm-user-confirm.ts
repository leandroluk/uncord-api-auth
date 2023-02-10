import { UserConfirm } from '$/domain/entities/user-confirm';

export type ConfirmUserConfirmTask = {
  confirm(data: ConfirmUserConfirmTask.Data): Promise<void>;
};
export namespace ConfirmUserConfirmTask {
  export type Data = Pick<UserConfirm, 'code' | 'userId'>;
}