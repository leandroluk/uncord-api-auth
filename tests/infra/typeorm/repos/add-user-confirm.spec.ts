import { typeormDataSource } from '$/infra/typeorm/data-source';
import { AddUserConfirmRepoImpl } from '$/infra/typeorm/repos/add-user-confirm';
import { mockUserConfirm } from 'mocks/domain/entities/user-confirm';
import { mockInsertQueryBuilder } from 'tests/helpers';

const makeSut = (): {
  sut: AddUserConfirmRepoImpl;
} => {
  const sut = new AddUserConfirmRepoImpl();
  return {
    sut,
  };
};

describe('AddUserConfirmRepoImpl', () => {
  it('Should return when success', async () => {
    const { sut } = makeSut();
    jest.spyOn(typeormDataSource, 'createQueryBuilder')
      .mockReturnValueOnce(mockInsertQueryBuilder());
    await expect(sut.add(mockUserConfirm)).resolves.toBeUndefined();
  });
});