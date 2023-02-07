import { User } from '$/domain/entities/user';

export type AddUserTask = {
  add(data: AddUserTask.Data): Promise<AddUserTask.Result>;
};
export namespace AddUserTask {
  export type Data = Pick<User, 'email'>;
  export type Result = User;
}