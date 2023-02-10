import { User } from '$/domain/entities/user';

export type AddUserWithProfileTask = {
  add(data: AddUserWithProfileTask.Data): Promise<AddUserWithProfileTask.Result>;
};
export namespace AddUserWithProfileTask {
  export type Data = Pick<User, 'email'>;
  export type Result = User;
}