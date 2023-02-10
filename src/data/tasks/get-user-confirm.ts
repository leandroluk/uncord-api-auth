import { NotFoundError } from '$/domain/errors/not-found';
import { GetUserConfirmTask } from '$/presentation/tasks/get-user-confirm';
import { GetUserConfirmRepo } from '../repos/get-user-confirm-repo';

export class GetUserConfirmTaskImpl implements GetUserConfirmTask {
  constructor (
    private readonly getUserConfirmRepo: GetUserConfirmRepo,
  ) {}

  async get(where: GetUserConfirmTask.Where): Promise<GetUserConfirmTask.Result> {
    const userConfirm = await this.getUserConfirmRepo.get(where);
    if (!userConfirm || userConfirm.removedAt) {
      throw new NotFoundError(`UserConfirm "${JSON.stringify(where)}" not found`);
    }
    return userConfirm;
  }
}