import { CheckEmailInUseTaskImpl } from '$/data/tasks/check-email-in-use';
import { ConflitError } from '$/domain/errors/conflit';
import { CheckEmailInUseTask } from '$/presentation/tasks/check-email-in-use';
import { GetUserRepoMock } from 'mocks/data/repos/get-user';

const makeSut = (): {
  getUserRepo: GetUserRepoMock;
  sut: CheckEmailInUseTaskImpl;
  email: CheckEmailInUseTask.Email;
} => {
  const getUserRepo = new GetUserRepoMock();
  const sut = new CheckEmailInUseTaskImpl(
    getUserRepo,
  );
  const email: CheckEmailInUseTask.Email = 'email';
  return {
    getUserRepo,
    sut,
    email,
  };
};

describe('CheckEmailInUseTaskImpl', () => {
  it('Should throw if getUserRepo.get throws', async () => {
    const { sut, getUserRepo, email } = makeSut();
    jest.spyOn(getUserRepo, 'get').mockRejectedValue(new Error());
    await expect(sut.check(email)).rejects.toThrow();
  });

  it('Should throw ConflitError if getUserRepo.get return truly', async () => {
    const { sut, email } = makeSut();
    await expect(sut.check(email)).rejects.toThrow(ConflitError);
  });

  it('Should return if getUserRepo.get return falsy', async () => {
    const { sut, getUserRepo, email } = makeSut();
    getUserRepo.$get = undefined;
    await expect(sut.check(email)).resolves.toBeUndefined();
  });
});