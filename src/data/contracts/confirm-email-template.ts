export type ConfirmEmailTemplateContract = {
  render(data: ConfirmEmailTemplateContract.Data): Promise<ConfirmEmailTemplateContract.Result>;
};
export namespace ConfirmEmailTemplateContract {
  export type Data = {
    confirmURL: string;
    password: string;
  };
  export type Result = {
    html: string;
    text: string;
  };
}