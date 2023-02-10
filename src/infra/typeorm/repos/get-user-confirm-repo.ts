import { GetUserConfirmRepo } from '$/data/repos/get-user-confirm-repo';
import { UserConfirmEntity } from '../entities/user-confirm';
import { typeormHelper } from '../helper';

export class GetUserConfirmRepoImpl implements GetUserConfirmRepo {
  async get(where: GetUserConfirmRepo.Where): Promise<GetUserConfirmRepo.Result> {
    const result = await typeormHelper
      .searchQuery2Builder(UserConfirmEntity, { where })
      .getOne();
    return result;
  }
}