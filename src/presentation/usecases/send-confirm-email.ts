import { NotFoundError } from '$/domain/errors/not-found';
import { SendConfirmEmailUseCase } from '$/domain/usecases/send-confirm-email';
import { AddUserConfirmTask } from '../tasks/add-user-confirm';
import { GetUserTask } from '../tasks/get-user';
import { GetUserConfirmTask } from '../tasks/get-user-confirm';
import { ResetUserTask } from '../tasks/reset-user';
import { ResetUserConfirmTask } from '../tasks/reset-user-confirm';
import { SendConfirmEmailTask } from '../tasks/send-confirm-email';

export class SendConfirmEmailUseCaseImpl implements SendConfirmEmailUseCase {
  constructor (
    private readonly getUserTask: GetUserTask,
    private readonly getUserConfirmTask: GetUserConfirmTask,
    private readonly resetUserConfirmTask: ResetUserConfirmTask,
    private readonly resetUserTask: ResetUserTask,
    private readonly addUserConfirmTask: AddUserConfirmTask,
    private readonly sendConfirmEmailTask: SendConfirmEmailTask,
  ) {}

  async send(data: SendConfirmEmailUseCase.Data): Promise<void> {
    let user = await this.getUserTask.get({
      email: { eq: data.body.email },
    });
    let userConfirm: GetUserConfirmTask.Result | ResetUserConfirmTask.Result;
    try {
      userConfirm = await this.getUserConfirmTask.get({
        userId: { eq: user.id },
      });
      await this.resetUserConfirmTask.reset(userConfirm.id);
    } catch (error) {
      if (!NotFoundError.is(error)) throw error;
      user = await this.resetUserTask.reset(user.id);
      userConfirm = await this.addUserConfirmTask.add({
        userId: user.id,
      });
    }
    await this.sendConfirmEmailTask.send({
      confirmCode: userConfirm.code,
      email: user.email,
      password: user.password,
    });
  }
}