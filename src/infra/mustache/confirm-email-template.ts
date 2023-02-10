import { ConfirmEmailTemplateContract } from '$/data/contracts/confirm-email-template';
import Mustache from 'mustache';

export class ConfirmEmailTemplateContractImpl implements ConfirmEmailTemplateContract {
  constructor (
    private readonly htmlTemplate: string,
    private readonly textTemplate: string,
  ) {}

  async render(data: ConfirmEmailTemplateContract.Data): Promise<ConfirmEmailTemplateContract.Result> {
    return {
      html: Mustache.render(this.htmlTemplate, data),
      text: Mustache.render(this.textTemplate, data),
    };
  }
}