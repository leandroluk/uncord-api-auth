import { SendConfirmEmailTask } from '$/presentation/tasks/send-confirm-email';
import { ConfirmEmailTemplateContract } from '../adapters/confirm-email-template';
import { SendEmailContract } from '../adapters/send-email';

export class SendConfirmEmailTaskImpl implements SendConfirmEmailTask {
  constructor (
    private readonly confirmURL: string,
    private readonly confirmEmailTemplateContract: ConfirmEmailTemplateContract,
    private readonly sendFrom: string,
    private readonly sendSubject: string,
    private readonly sendEmailContract: SendEmailContract,
  ) {}

  async send(data: SendConfirmEmailTask.Data): Promise<void> {
    const link = `${this.confirmURL}?email=${data.email}&code:${data.confirmCode}`;
    const { html, text } = await this.confirmEmailTemplateContract.render({
      confirmURL: link,
      password: data.password,
    });
    await this.sendEmailContract.send({
      from: this.sendFrom,
      to: data.email,
      subject: this.sendSubject,
      html,
      text,
    });
  }
}