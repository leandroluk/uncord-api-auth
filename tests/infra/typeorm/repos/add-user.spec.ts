import { typeormDataSource } from '$/infra/typeorm/data-source';
import { AddUserRepoImpl } from '$/infra/typeorm/repos/add-user';
import { mockUser } from 'mocks/domain/entities/user';
import { mockInsertQueryBuilder } from 'tests/helpers';

const makeSut = (): {
  sut: AddUserRepoImpl;
} => {
  const sut = new AddUserRepoImpl();
  return {
    sut,
  };
};

describe('AddUserRepoImpl', () => {
  it('Should return when success', async () => {
    const { sut } = makeSut();
    jest.spyOn(typeormDataSource, 'createQueryBuilder')
      .mockReturnValueOnce(mockInsertQueryBuilder());
    await expect(sut.add(mockUser)).resolves.toBeUndefined();
  });
});