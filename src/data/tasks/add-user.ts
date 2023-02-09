import { AddUserTask } from '$/presentation/tasks/add-user';
import { CreateRandomStringContract } from '../contracts/create-random-string';
import { CreateUuidContract } from '../contracts/create-uuid';
import { AddUserRepo } from '../repos/add-user';

export class AddUserTaskImpl implements AddUserTask {
  constructor (
    private readonly createUuidContract: CreateUuidContract,
    private readonly createRandomStringContract: CreateRandomStringContract,
    private readonly addUserRepo: AddUserRepo,
    private readonly randomPasswordLength: number,
  ) {}

  async add(data: AddUserTask.Data): Promise<AddUserTask.Result> {
    const now = new Date();
    const [id, randomPasswordLength] = await Promise.all([
      this.createUuidContract.create(),
      this.createRandomStringContract.create(this.randomPasswordLength),
    ]);
    const user: AddUserTask.Result = {
      id,
      timestamp: now,
      createdAt: now,
      email: data.email,
      password: randomPasswordLength,
    };
    await this.addUserRepo.add(user);
    return user;
  }
}