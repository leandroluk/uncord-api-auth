import { ConfirmEmailTemplateContract } from '$/data/contracts/confirm-email-template';
import fs from 'fs';
import Mustache from 'mustache';

export class ConfirmEmailTemplateContractImpl implements ConfirmEmailTemplateContract {
  private readonly htmlTemplate: string;
  private readonly textTemplate: string;
  constructor (
    private readonly htmlTemplatePath: string,
    private readonly textTemplatePath: string,
  ) {
    this.htmlTemplate = fs.readFileSync(this.htmlTemplatePath, 'utf8');
    this.textTemplate = fs.readFileSync(this.textTemplatePath, 'utf8');
  }

  async render(data: ConfirmEmailTemplateContract.Data): Promise<ConfirmEmailTemplateContract.Result> {
    return {
      html: Mustache.render(this.htmlTemplate, data),
      text: Mustache.render(this.textTemplate, data),
    };
  }
}