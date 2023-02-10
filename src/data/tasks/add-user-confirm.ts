import { AddUserConfirmTask } from '$/presentation/tasks/add-user-confirm';
import { CreateUuidContract } from '../contracts/create-uuid';
import { AddUserConfirmRepo } from '../repos/add-user-confirm';

export class AddUserConfirmTaskImpl implements AddUserConfirmTask {
  constructor (
    private readonly createUuidContract: CreateUuidContract,
    private readonly addUserConfirmRepo: AddUserConfirmRepo,
    private readonly expiresAt: number,
  ) {}

  async add(data: AddUserConfirmTask.Data): Promise<AddUserConfirmTask.Result> {
    const now = new Date();
    const [id, code] = await Promise.all([
      this.createUuidContract.create(),
      this.createUuidContract.create(),
    ]);
    const userConfirm: AddUserConfirmTask.Result = {
      id,
      timestamp: now,
      createdAt: now,
      userId: data.userId,
      expiresIn: new Date(Date.now() + this.expiresAt),
      code,
    };
    await this.addUserConfirmRepo.add(userConfirm);
    return userConfirm;
  }
}