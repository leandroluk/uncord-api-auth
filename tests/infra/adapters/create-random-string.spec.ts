import { CreateRandomStringContractImpl } from '$/infra/adapters/create-random-string';

jest.mock('crypto', () => ({
  randomBytes: jest.fn((length) => ({
    toString: jest.fn(() => Array(length).fill('ab').join('')),
  })),
}));

const makeSut = (): {
  sut: CreateRandomStringContractImpl;
  size: number;
} => {
  const sut = new CreateRandomStringContractImpl();
  const size = 3;
  return {
    sut,
    size,
  };
};

describe('CreateRandomStringContractImpl', () => {
  it('Should return string with 3 characters', async () => {
    const { sut, size } = makeSut();
    await expect(sut.create(size)).resolves.toBe('aba');
  });
});