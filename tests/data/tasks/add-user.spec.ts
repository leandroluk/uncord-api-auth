import { AddUserWithProfileTaskImpl } from '$/data/tasks/add-user-with-profile';
import { AddUserWithProfileTask } from '$/presentation/tasks/add-user-with-profile';
import { CreateRandomStringContractMock } from 'mocks/data/contracts/create-random-string';
import { CreateUuidContractMock } from 'mocks/data/contracts/create-uuid';
import { AddUserRepoMock } from 'mocks/data/repos/add-user';

const makeSut = (): {
  createUuidContract: CreateUuidContractMock;
  createRandomStringContract: CreateRandomStringContractMock;
  addUserRepo: AddUserRepoMock;
  sut: AddUserWithProfileTaskImpl;
  data: AddUserWithProfileTask.Data;
} => {
  const createUuidContract = new CreateUuidContractMock();
  const createRandomStringContract = new CreateRandomStringContractMock();
  const addUserRepo = new AddUserRepoMock();
  const sut = new AddUserWithProfileTaskImpl(
    createUuidContract,
    createRandomStringContract,
    addUserRepo,
    10,
  );
  const data: AddUserWithProfileTask.Data = {
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

describe('AddUserWithProfileTaskImpl', () => {
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