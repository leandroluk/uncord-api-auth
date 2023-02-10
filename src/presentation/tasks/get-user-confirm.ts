import { UserConfirm } from '$/domain/entities/user-confirm';
import { Search } from '$/domain/generics/search';

export type GetUserConfirmTask = {
  get(where: GetUserConfirmTask.Where): Promise<GetUserConfirmTask.Result>;
};
export namespace GetUserConfirmTask {
  export type Where = Search.Query.Where<UserConfirm>;
  export type Result = UserConfirm;
}