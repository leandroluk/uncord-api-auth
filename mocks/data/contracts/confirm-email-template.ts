import { ConfirmEmailTemplateContract } from '$/data/contracts/confirm-email-template';

export class ConfirmEmailTemplateContractMock implements ConfirmEmailTemplateContract {
  constructor (
    public $render: ConfirmEmailTemplateContract.Result = {
      html: 'html',
      text: 'text',
    },
  ) {}

  async render(_data: ConfirmEmailTemplateContract.Data): Promise<ConfirmEmailTemplateContract.Result> {
    return this.$render;
  }
}