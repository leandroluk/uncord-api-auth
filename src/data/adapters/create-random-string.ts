export type CreateRandomStringContract = {
  create(size: CreateRandomStringContract.Size): Promise<CreateRandomStringContract.Result>;
};
export namespace CreateRandomStringContract {
  export type Size = number;
  export type Result = string;
}