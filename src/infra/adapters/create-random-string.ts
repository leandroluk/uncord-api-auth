import { CreateRandomStringContract } from '$/data/contracts/create-random-string';
import crypto from 'crypto';

export class CreateRandomStringContractImpl implements CreateRandomStringContract {
  async create(size: CreateRandomStringContract.Size): Promise<CreateRandomStringContract.Result> {
    const str = crypto
      .randomBytes(Math.ceil(size / 2))
      .toString('hex').slice(0, size);
    return str;
  }
}