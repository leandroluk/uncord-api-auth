import { SendEmailContract } from '$/data/contracts/send-email';

export class SendEmailContractMock implements SendEmailContract {
  async send(_data: SendEmailContract.Data): Promise<void> {
    //
  }
}