import { SendEmailContract } from '$/data/adapters/send-email';
import { createTransport, SentMessageInfo, Transporter } from 'nodemailer';

export class SendEmailContractImpl implements SendEmailContract {
  private readonly transporter: Transporter<SentMessageInfo>;

  constructor (
    private readonly smtp: string,
    private readonly port: number,
    private readonly secure: boolean,
    private readonly username: string,
    private readonly password: string,
  ) {
    this.transporter = createTransport({
      host: this.smtp,
      port: this.port,
      secure: this.secure,
      auth: {
        user: this.username,
        pass: this.password,
      },
    });
  }

  async send(data: SendEmailContract.Data): Promise<void> {
    await this.transporter.sendMail({
      from: data.from,
      to: data.to,
      subject: data.subject,
      text: data.text,
      html: data.html,
    });
  }
}