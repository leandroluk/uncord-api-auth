import { User } from '$/domain/entities/user';
import { UserConfirm } from '$/domain/entities/user-confirm';

export type SendConfirmEmailTask = {
  send(data: SendConfirmEmailTask.Data): Promise<void>;
};
export namespace SendConfirmEmailTask {
  export type Data = {
    email: User['email'];
    password: User['password'];
    confirmCode: UserConfirm['code'];
  };
}