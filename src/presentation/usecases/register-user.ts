import { RegisterUserUseCase } from '$/domain/usecases/register-user';
import { AddUserConfirmTask } from '../tasks/add-user-confirm';
import { AddUserWithProfileTask } from '../tasks/add-user-with-profile';
import { CheckEmailInUseTask } from '../tasks/check-email-in-use';
import { SendConfirmEmailTask } from '../tasks/send-confirm-email';

export class RegisterUserUseCaseImpl implements RegisterUserUseCase {
  constructor (
    private readonly checkEmailInUseTask: CheckEmailInUseTask,
    private readonly addUserWithProfileTask: AddUserWithProfileTask,
    private readonly addUserConfirmTask: AddUserConfirmTask,
    private readonly sendConfirmEmailTask: SendConfirmEmailTask,
  ) {}

  async register(data: RegisterUserUseCase.Data): Promise<void> {
    await this.checkEmailInUseTask.check(data.body.email);
    const user = await this.addUserWithProfileTask.add(data.body);
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