import { UserConfirm } from '$/domain/entities/user-confirm';
import { Search } from '$/domain/generics/search';

export type GetUserConfirmRepo = {
  get(where: GetUserConfirmRepo.Where): Promise<GetUserConfirmRepo.Result>;
};
export namespace GetUserConfirmRepo {
  export type Where = Search.Query.Where<UserConfirm>;
  export type Result = UserConfirm;
}