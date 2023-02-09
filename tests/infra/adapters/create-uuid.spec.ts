import { CreateUuidContractImpl } from '$/infra/adapters/create-uuid';

jest.mock('crypto', () => ({
  randomUUID: jest.fn().mockReturnValue('uuid'),
}));

const makeSut = (): {
  sut: CreateUuidContractImpl;
} => {
  const sut = new CreateUuidContractImpl();
  return {
    sut,
  };
};

describe('CreateUuidContractImpl', () => {
  it('Should return generated uuid', async () => {
    const { sut } = makeSut();
    await expect(sut.create()).resolves.toBe('uuid');
  });
});