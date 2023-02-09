import { SendConfirmEmailTaskImpl } from '$/data/tasks/send-confirm-email';
import { SendConfirmEmailTask } from '$/presentation/tasks/send-confirm-email';
import { ConfirmEmailTemplateContractMock } from 'mocks/data/contracts/confirm-email-template';
import { SendEmailContractMock } from 'mocks/data/contracts/send-email';

const makeSut = (): {
  confirmURL: string;
  confirmEmailTemplateContract: ConfirmEmailTemplateContractMock;
  sendFrom: string;
  sendSubject: string;
  sendEmailContract: SendEmailContractMock;
  sut: SendConfirmEmailTaskImpl;
  data: SendConfirmEmailTask.Data;
} => {
  const confirmURL = 'confirmURL';
  const confirmEmailTemplateContract = new ConfirmEmailTemplateContractMock();
  const sendFrom = 'sendFrom';
  const sendSubject = 'sendSubject';
  const sendEmailContract = new SendEmailContractMock();
  const sut = new SendConfirmEmailTaskImpl(
    confirmURL,
    confirmEmailTemplateContract,
    sendFrom,
    sendSubject,
    sendEmailContract,
  );
  const data: SendConfirmEmailTask.Data = {
    confirmCode: 'confirmCode',
    email: 'email',
    password: 'password',
  };
  return {
    confirmURL,
    confirmEmailTemplateContract,
    sendFrom,
    sendSubject,
    sendEmailContract,
    sut,
    data,
  };
};

describe('SendConfirmEmailTaskImpl', () => {
  it('Should throw if confirmEmailTemplateContract.render throws', async () => {
    const { sut, confirmEmailTemplateContract, data } = makeSut();
    jest.spyOn(confirmEmailTemplateContract, 'render').mockRejectedValue(new Error());
    await expect(sut.send(data)).rejects.toThrow();
  });
  it('should throw if sendEmailContract.send throws', async () => {
    const { sut, sendEmailContract, data } = makeSut();
    jest.spyOn(sendEmailContract, 'send').mockRejectedValue(new Error());
    await expect(sut.send(data)).rejects.toThrow();
  });

  it('Should interpolate confirmURL correctly and return', async () => {
    const { sut, confirmEmailTemplateContract, data } = makeSut();
    const renderSpy = jest.spyOn(confirmEmailTemplateContract, 'render');
    await expect(sut.send(data)).resolves.toBeUndefined();
    expect(renderSpy).toBeCalledWith({
      confirmURL: 'confirmURL?email=email&confirmCode=confirmCode',
      password: 'password',
    });
  });
});