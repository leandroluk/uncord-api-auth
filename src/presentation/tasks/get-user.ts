import { User } from '$/domain/entities/user';
import { Search } from '$/domain/generics/search';

export type GetUserTask = {
  get(where: GetUserTask.Where): Promise<User>;
};
export namespace GetUserTask {
  export type Where = Search.Query.Where<User>;
  export type Result = User;
}