import { NotFoundError } from '$/domain/errors/not-found';
import { GetUserTask } from '$/presentation/tasks/get-user';
import { GetUserRepo } from '../repos/get-user-repo';

export class GetUserTaskImpl implements GetUserTask {
  constructor (
    private readonly getUserRepo: GetUserRepo,
  ) {}

  async get(where: GetUserTask.Where): Promise<GetUserTask.Result> {
    const user = await this.getUserRepo.get(where);
    if (!user || user.removedAt) {
      throw new NotFoundError(`User "${JSON.stringify(where)}" not found`);
    }
    return user;
  }
}