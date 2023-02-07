import { CreateUuidContract } from '$/data/adapters/create-uuid';
import crypto from 'crypto';

export class CreateUuidContractImpl implements CreateUuidContract {
  async create(): Promise<CreateUuidContract.Result> {
    const uuid = crypto.randomUUID();
    return uuid;
  }
}