import { ConfirmEmailTemplateContract } from '$/data/contracts/confirm-email-template';
import { ConfirmEmailTemplateContractImpl } from '$/infra/mustache/confirm-email-template';

jest.mock('fs', () => ({
  readFileSync: jest.fn().mockReturnValue(''),
}));

jest.mock('mustache', () => ({
  render: jest.fn().mockReturnValue('rendered'),
}));

const makeSut = (): {
  sut: ConfirmEmailTemplateContractImpl;
  data: ConfirmEmailTemplateContract.Data;
} => {
  const sut = new ConfirmEmailTemplateContractImpl('', '');
  const data: ConfirmEmailTemplateContract.Data = {
    confirmURL: 'confirmURL',
    password: 'password',
  };
  return {
    sut,
    data,
  };
};

describe('ConfirmEmailTemplateContractImpl', () => {
  it('Should return html and text templates', async () => {
    const { sut, data } = makeSut();
    await expect(sut.render(data)).resolves.toMatchObject({
      html: 'rendered',
      text: 'rendered',
    });
  });
});