import { RegisterUser } from '$/domain/usecases/register-user';
import { RegisterUserImpl } from '$/presentation/usecases/register-user';
import { AddUserTaskMock } from 'mocks/presentation/tasks/add-user';
import { AddUserConfirmTaskMock } from 'mocks/presentation/tasks/add-user-confirm';
import { CheckEmailInUseTaskMock } from 'mocks/presentation/tasks/check-email-in-use';
import { SendConfirmEmailTaskMock } from 'mocks/presentation/tasks/send-confirm-email';

const makeSut = (): {
  checkEmailInUseTask: CheckEmailInUseTaskMock;
  addUserTask: AddUserTaskMock;
  addUserConfirmTask: AddUserConfirmTaskMock;
  sendConfirmEmailTask: SendConfirmEmailTaskMock;
  sut: RegisterUserImpl;
  data: RegisterUser.Data;
} => {
  const checkEmailInUseTask = new CheckEmailInUseTaskMock();
  const addUserTask = new AddUserTaskMock();
  const addUserConfirmTask = new AddUserConfirmTaskMock();
  const sendConfirmEmailTask = new SendConfirmEmailTaskMock();
  const sut = new RegisterUserImpl(
    checkEmailInUseTask,
    addUserTask,
    addUserConfirmTask,
    sendConfirmEmailTask,
  );
  const data: RegisterUser.Data = {
    body: {
      email: 'email',
    },
  };
  return {
    checkEmailInUseTask,
    addUserTask,
    addUserConfirmTask,
    sendConfirmEmailTask,
    sut,
    data,
  };
};

describe('RegisterUserImpl', () => {
  it('Should throw if checkEmailInUseTask.check throws', async () => {
    const { sut, checkEmailInUseTask, data } = makeSut();
    jest.spyOn(checkEmailInUseTask, 'check').mockRejectedValue(new Error());
    await expect(sut.register(data)).rejects.toThrow();
  });

  it('Should throw if addUserTask.add throws', async () => {
    const { sut, addUserTask, data } = makeSut();
    jest.spyOn(addUserTask, 'add').mockRejectedValue(new Error());
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