import { ResetUserTask } from '$/presentation/tasks/reset-user';
import { CreateRandomStringContract } from '../contracts/create-random-string';
import { EditUserRepo } from '../repos/edit-user';
import { GetUserRepo } from '../repos/get-user-repo';

export class ResetUserTaskImpl implements ResetUserTask {
  constructor (
    private readonly getUserRepo: GetUserRepo,
    private readonly createRandomStringContract: CreateRandomStringContract,
    private readonly editUserRepo: EditUserRepo,
    private readonly randomPasswordLength: number,
  ) {}

  async reset(id: ResetUserTask.Id): Promise<ResetUserTask.Result> {
    const [user, password] = await Promise.all([
      this.getUserRepo.get({ id: { eq: id } }),
      this.createRandomStringContract.create(this.randomPasswordLength),
    ]);
    const data: EditUserRepo.Data = {
      id,
      changes: {
        timestamp: new Date(),
        password,
      },
    };
    await this.editUserRepo.edit(data);
    return { ...user, ...data.changes };
  }
}