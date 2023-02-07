import { User } from '$/domain/entities/user';

export type CheckEmailInUseTask = {
  check(email: CheckEmailInUseTask.Email): Promise<void>;
};
export namespace CheckEmailInUseTask {
  export type Email = User['email'];
}