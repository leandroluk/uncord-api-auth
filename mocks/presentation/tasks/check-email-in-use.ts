import { CheckEmailInUseTask } from '$/presentation/tasks/check-email-in-use';

export class CheckEmailInUseTaskMock implements CheckEmailInUseTask {
  async check(_email: string): Promise<void> {
    //
  }
}