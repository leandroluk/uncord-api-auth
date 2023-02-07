import { AddUserConfirmTask } from '$/presentation/tasks/add-user-confirm';
import { CreateRandomStringContract } from '../adapters/create-random-string';
import { CreateUuidContract } from '../adapters/create-uuid';
import { AddUserConfirmRepo } from '../repos/add-user-confirm';

export class AddUserConfirmTaskImpl implements AddUserConfirmTask {
  constructor (
    private readonly createUuidContract: CreateUuidContract,
    private readonly createRandomString: CreateRandomStringContract,
    private readonly addUserConfirmRepo: AddUserConfirmRepo,
    private readonly codeLength: number,
    private readonly expiresAt: number,
  ) {}

  async add(data: AddUserConfirmTask.Data): Promise<AddUserConfirmTask.Result> {
    const now = new Date();
    const [id, code] = await Promise.all([
      this.createUuidContract.create(),
      this.createRandomString.create(this.codeLength),
    ]);
    const userConfirm: AddUserConfirmTask.Result = {
      id,
      timestamp: now,
      createdAt: now,
      userId: data.userId,
      expiresIn: new Date(Date.now() + this.expiresAt),
      code: code.toUpperCase(),
    };
    await this.addUserConfirmRepo.add(userConfirm);
    return userConfirm;
  }
}