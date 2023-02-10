import { ResetUserConfirmTask } from '$/presentation/tasks/reset-user-confirm';
import { CreateUuidContract } from '../contracts/create-uuid';
import { EditUserConfirmRepo } from '../repos/edit-user-confirm';
import { GetUserConfirmRepo } from '../repos/get-user-confirm-repo';

export class ResetUserConfirmTaskImpl implements ResetUserConfirmTask {
  constructor (
    private readonly getUserConfirmRepo: GetUserConfirmRepo,
    private readonly createUuidContract: CreateUuidContract,
    private readonly editUserConfirmRepo: EditUserConfirmRepo,
    private readonly expiresAt: number,
  ) {}

  async reset(id: ResetUserConfirmTask.Id): Promise<ResetUserConfirmTask.Result> {
    const userConfirm = await this.getUserConfirmRepo.get({
      id: { eq: id },
    });
    const data: EditUserConfirmRepo.Data = {
      id,
      changes: {
        timestamp: new Date(),
        code: await this.createUuidContract.create(),
        expiresIn: new Date(Date.now() + this.expiresAt),
      },
    };
    await this.editUserConfirmRepo.edit(data);
    return { ...userConfirm, ...data.changes };
  }
}