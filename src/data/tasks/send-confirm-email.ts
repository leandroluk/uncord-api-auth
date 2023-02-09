import { SendConfirmEmailTask } from '$/presentation/tasks/send-confirm-email';
import { ConfirmEmailTemplateContract } from '../contracts/confirm-email-template';
import { SendEmailContract } from '../contracts/send-email';

export class SendConfirmEmailTaskImpl implements SendConfirmEmailTask {
  constructor (
    private readonly confirmURL: string,
    private readonly confirmEmailTemplateContract: ConfirmEmailTemplateContract,
    private readonly sendFrom: string,
    private readonly sendSubject: string,
    private readonly sendEmailContract: SendEmailContract,
  ) {}

  async send(data: SendConfirmEmailTask.Data): Promise<void> {
    const confirmURL = `${this.confirmURL}?email=${data.email}&confirmCode=${data.confirmCode}`;
    const { html, text } = await this.confirmEmailTemplateContract.render({
      confirmURL,
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