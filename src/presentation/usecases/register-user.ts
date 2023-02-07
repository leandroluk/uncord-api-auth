import { RegisterUser } from '$/domain/usecases/register-user';
import { AddUserTask } from '../tasks/add-user';
import { AddUserConfirmTask } from '../tasks/add-user-confirm';
import { CheckEmailInUseTask } from '../tasks/check-email-in-use';
import { SendConfirmEmailTask } from '../tasks/send-confirm-email';

export class RegisterUserImpl implements RegisterUser {
  constructor (
    private readonly checkEmailInUseTask: CheckEmailInUseTask,
    private readonly addUserTask: AddUserTask,
    private readonly addUserConfirmTask: AddUserConfirmTask,
    private readonly sendConfirmEmailTask: SendConfirmEmailTask,
  ) {}

  async register(data: RegisterUser.Data): Promise<void> {
    await this.checkEmailInUseTask.check(data.body.email);
    const user = await this.addUserTask.add(data.body);
    const userConfirm = await this.addUserConfirmTask.add({
      userId: user.id,
    });
    await this.sendConfirmEmailTask.send({
      email: user.email,
      password: user.password,
      confirmCode: userConfirm.code,
    });
  }
}