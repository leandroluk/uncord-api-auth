import { User } from '$/domain/entities/user';

export type ResetUserTask = {
  reset(id: ResetUserTask.Id): Promise<ResetUserTask.Result>;
};
export namespace ResetUserTask {
  export type Id = User['id'];
  export type Result = User;
}