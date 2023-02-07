export type CreateUuidContract = {
  create(): Promise<CreateUuidContract.Result>;
};
export namespace CreateUuidContract {
  export type Result = string;
}