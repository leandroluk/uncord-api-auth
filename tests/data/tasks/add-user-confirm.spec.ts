import { AddUserConfirmTaskImpl } from '$/data/tasks/add-user-confirm';
import { AddUserConfirmTask } from '$/presentation/tasks/add-user-confirm';
import { CreateUuidContractMock } from 'mocks/data/contracts/create-uuid';
import { AddUserConfirmRepoMock } from 'mocks/data/repos/add-user-confirm';

const makeSut = (): {
  createUuidContract: CreateUuidContractMock;
  addUserConfirmRepo: AddUserConfirmRepoMock;
  sut: AddUserConfirmTaskImpl;
  data: AddUserConfirmTask.Data;
} => {
  const createUuidContract = new CreateUuidContractMock();
  const addUserConfirmRepo = new AddUserConfirmRepoMock();
  const sut = new AddUserConfirmTaskImpl(
    createUuidContract,
    addUserConfirmRepo,
    1,
  );
  const data: AddUserConfirmTask.Data = {
    userId: 'userId',
  };
  return {
    createUuidContract,
    addUserConfirmRepo,
    sut,
    data,
  };
};

describe('AddUserConfirmTaskImpl', () => {
  it('Should throw createUuidContract.create throws', async () => {
    const { sut, createUuidContract, data } = makeSut();
    jest.spyOn(createUuidContract, 'create').mockRejectedValue(new Error());
    await expect(sut.add(data)).rejects.toThrow();
  });

  it('Should throw addUserConfirmRepo.add throws', async () => {
    const { sut, addUserConfirmRepo, data } = makeSut();
    jest.spyOn(addUserConfirmRepo, 'add').mockRejectedValue(new Error());
    await expect(sut.add(data)).rejects.toThrow();
  });

  it('Should return added UserConfirm', async () => {
    const { sut, createUuidContract, data } = makeSut();
    const result = await sut.add(data);
    expect(result.id).toBeDefined();
    expect(result.timestamp).toBeDefined();
    expect(result.createdAt).toBeDefined();
    expect(result.removedAt).toBeUndefined();
    expect(result.userId).toBe(data.userId);
    expect(result.code).toBe(createUuidContract.$create);
    expect(result.expiresIn).toBeDefined();
  });
});