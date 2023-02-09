import { SendEmailContract } from '$/data/contracts/send-email';
import { SendEmailContractImpl } from '$/infra/nodemailer/send-email';

jest.mock('nodemailer', () => ({
  createTransport: jest.fn(() => ({
    sendMail: jest.fn(),
  })),
}));

const makeSut = (): {
  sut: SendEmailContractImpl;
  data: SendEmailContract.Data;
} => {
  const sut = new SendEmailContractImpl('', 0, false, '', '');
  const data: SendEmailContract.Data = {
    from: 'from',
    html: 'html',
    subject: 'subject',
    text: 'text',
    to: 'to',
  };
  return {
    sut,
    data,
  };
};

describe('SendEmailContractImpl', () => {
  it('Should return if send email', async () => {
    const { sut, data } = makeSut();
    await expect(sut.send(data)).resolves.toBeUndefined();
  });
});