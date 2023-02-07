import { ConflitError } from '$/domain/errors/conflit';
import { CheckEmailInUseTask } from '$/presentation/tasks/check-email-in-use';
import { GetUserRepo } from '../repos/get-user-repo';

export class CheckEmailInUseTaskImpl implements CheckEmailInUseTask {
  constructor (
    private readonly getUserRepo: GetUserRepo,
  ) {}

  async check(email: string): Promise<void> {
    const user = await this.getUserRepo.get({
      email: {
        eq: email,
      },
    });
    if (user) {
      throw new ConflitError(`Email "${email}" already in use`);
    }
  }
}