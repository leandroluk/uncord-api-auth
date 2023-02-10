import { ConfirmEmailUseCase } from '$/domain/usecases/confirm-email';
import { ConfirmUserConfirmTask } from '../tasks/confirm-user-confirm';

export class ConfirmEmailUseCaseImpl implements ConfirmEmailUseCase {
  constructor (
    private readonly confirmUserConfirmTask: ConfirmUserConfirmTask,
  ) {}

  async confirm(data: ConfirmEmailUseCase.Data): Promise<void> {
    await this.confirmUserConfirmTask.confirm(data.body);
  }
}