export type SendEmailContract = {
  send(data: SendEmailContract.Data): Promise<void>;
};
export namespace SendEmailContract {
  export type Data = {
    from: string;
    to: string;
    subject: string;
    text: string;
    html: string;
  };
}