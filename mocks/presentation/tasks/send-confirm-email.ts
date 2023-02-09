import { SendConfirmEmailTask } from '$/presentation/tasks/send-confirm-email';

export class SendConfirmEmailTaskMock implements SendConfirmEmailTask {
  async send(_data: SendConfirmEmailTask.Data): Promise<void> {
    //
  }
}