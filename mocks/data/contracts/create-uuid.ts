import { CreateUuidContract } from '$/data/contracts/create-uuid';

export class CreateUuidContractMock implements CreateUuidContract {
  constructor (
    public $create: CreateUuidContract.Result = 'uuid',
  ) {}

  async create(): Promise<CreateUuidContract.Result> {
    return this.$create;
  }
}