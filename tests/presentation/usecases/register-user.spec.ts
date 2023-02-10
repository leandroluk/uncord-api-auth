import { RegisterUserUseCase } from '$/domain/usecases/register-user';
import { RegisterUserUseCaseImpl } from '$/presentation/usecases/register-user';
import { AddUserWithProfileTaskMock } from 'mocks/presentation/tasks/add-user';
import { AddUserConfirmTaskMock } from 'mocks/presentation/tasks/add-user-confirm';
import { CheckEmailInUseTaskMock } from 'mocks/presentation/tasks/check-email-in-use';
import { SendConfirmEmailTaskMock } from 'mocks/presentation/tasks/send-confirm-email';

const makeSut = (): {
  checkEmailInUseTask: CheckEmailInUseTaskMock;
  addUserWithProfileTask: AddUserWithProfileTaskMock;
  addUserConfirmTask: AddUserConfirmTaskMock;
  sendConfirmEmailTask: SendConfirmEmailTaskMock;
  sut: RegisterUserUseCaseImpl;
  data: RegisterUserUseCase.Data;
} => {
  const checkEmailInUseTask = new CheckEmailInUseTaskMock();
  const addUserWithProfileTask = new AddUserWithProfileTaskMock();
  const addUserConfirmTask = new AddUserConfirmTaskMock();
  const sendConfirmEmailTask = new SendConfirmEmailTaskMock();
  const sut = new RegisterUserUseCaseImpl(
    checkEmailInUseTask,
    addUserWithProfileTask,
    addUserConfirmTask,
    sendConfirmEmailTask,
  );
  const data: RegisterUserUseCase.Data = {
    body: {
      email: 'email',
    },
  };
  return {
    checkEmailInUseTask,
    addUserWithProfileTask,
    addUserConfirmTask,
    sendConfirmEmailTask,
    sut,
    data,
  };
};

describe('RegisterUserUseCaseImpl', () => {
  it('Should throw if checkEmailInUseTask.check throws', async () => {
    const { sut, checkEmailInUseTask, data } = makeSut();
    jest.spyOn(checkEmailInUseTask, 'check').mockRejectedValue(new Error());
    await expect(sut.register(data)).rejects.toThrow();
  });

  it('Should throw if addUserWithProfileTask.add throws', async () => {
    const { sut, addUserWithProfileTask, data } = makeSut();
    jest.spyOn(addUserWithProfileTask, 'add').mockRejectedValue(new Error());
    await expect(sut.register(data)).rejects.toThrow();
  });

  it('Should throw if addUserConfirmTask.add throws', async () => {
    const { sut, addUserConfirmTask, data } = makeSut();
    jest.spyOn(addUserConfirmTask, 'add').mockRejectedValue(new Error());
    await expect(sut.register(data)).rejects.toThrow();
  });

  it('Should throw if sendConfirmEmailTask.send throws', async () => {
    const { sut, sendConfirmEmailTask, data } = makeSut();
    jest.spyOn(sendConfirmEmailTask, 'send').mockRejectedValue(new Error());
    await expect(sut.register(data)).rejects.toThrow();
  });

  it('Should return if User is registered', async () => {
    const { sut, data } = makeSut();
    await expect(sut.register(data)).resolves.toBeUndefined();
  });
});