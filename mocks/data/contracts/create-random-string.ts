import { CreateRandomStringContract } from '$/data/contracts/create-random-string';

export class CreateRandomStringContractMock implements CreateRandomStringContract {
  constructor (
    public $create: CreateRandomStringContract.Result = 'string',
  ) {}

  async create(_size: CreateRandomStringContract.Size): Promise<CreateRandomStringContract.Result> {
    return this.$create;
  }
}