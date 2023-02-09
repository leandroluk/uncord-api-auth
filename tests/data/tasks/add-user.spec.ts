import { AddUserTaskImpl } from '$/data/tasks/add-user';
import { AddUserTask } from '$/presentation/tasks/add-user';
import { CreateRandomStringContractMock } from 'mocks/data/contracts/create-random-string';
import { CreateUuidContractMock } from 'mocks/data/contracts/create-uuid';
import { AddUserRepoMock } from 'mocks/data/repos/add-user';

const makeSut = (): {
  createUuidContract: CreateUuidContractMock;
  createRandomStringContract: CreateRandomStringContractMock;
  addUserRepo: AddUserRepoMock;
  sut: AddUserTaskImpl;
  data: AddUserTask.Data;
} => {
  const createUuidContract = new CreateUuidContractMock();
  const createRandomStringContract = new CreateRandomStringContractMock();
  const addUserRepo = new AddUserRepoMock();
  const sut = new AddUserTaskImpl(
    createUuidContract,
    createRandomStringContract,
    addUserRepo,
    10,
  );
  const data: AddUserTask.Data = {
    email: 'email',
  };
  return {
    createUuidContract,
    createRandomStringContract,
    addUserRepo,
    sut,
    data,
  };
};

describe('AddUserTaskImpl', () => {
  it('Should throw if createUuidContract.create throws', async () => {
    const { sut, createUuidContract, data } = makeSut();
    jest.spyOn(createUuidContract, 'create').mockRejectedValue(new Error());
    await expect(sut.add(data)).rejects.toThrow();
  });

  it('Should throw if createRandomStringContract.create throws', async () => {
    const { sut, createRandomStringContract, data } = makeSut();
    jest.spyOn(createRandomStringContract, 'create').mockRejectedValue(new Error());
    await expect(sut.add(data)).rejects.toThrow();
  });

  it('Should throw if addUserRepo.add throws', async () => {
    const { sut, addUserRepo, data } = makeSut();
    jest.spyOn(addUserRepo, 'add').mockRejectedValue(new Error());
    await expect(sut.add(data)).rejects.toThrow();
  });

  it('Should return added User', async () => {
    const { sut, data } = makeSut();
    const result = await sut.add(data);
    expect(result.id).toBeDefined();
    expect(result.timestamp).toBeDefined();
    expect(result.createdAt).toBeDefined();
    expect(result.removedAt).toBeUndefined();
    expect(result.email).toBe(data.email);
    expect(result.password).toBeDefined();
  });
});