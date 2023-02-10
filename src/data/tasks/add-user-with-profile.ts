import { AddUserWithProfileTask } from '$/presentation/tasks/add-user-with-profile';
import { CreateRandomStringContract } from '../contracts/create-random-string';
import { CreateUuidContract } from '../contracts/create-uuid';
import { AddUserRepo } from '../repos/add-user';

export class AddUserWithProfileTaskImpl implements AddUserWithProfileTask {
  constructor (
    private readonly createUuidContract: CreateUuidContract,
    private readonly createRandomStringContract: CreateRandomStringContract,
    private readonly addUserRepo: AddUserRepo,
    private readonly randomPasswordLength: number,
  ) {}

  async add(data: AddUserWithProfileTask.Data): Promise<AddUserWithProfileTask.Result> {
    const now = new Date();
    const [id, password] = await Promise.all([
      this.createUuidContract.create(),
      this.createRandomStringContract.create(this.randomPasswordLength),
    ]);
    const user: AddUserWithProfileTask.Result = {
      id,
      timestamp: now,
      createdAt: now,
      email: data.email,
      password,
    };
    await this.addUserRepo.add(user);
    return user;
  }
}