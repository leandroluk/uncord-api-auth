import { AddUserConfirmRepo } from '$/data/repos/add-user-confirm';
import { typeormDataSource } from '../data-source';
import { UserConfirmEntity } from '../entities/user-confirm';

export class AddUserConfirmRepoImpl implements AddUserConfirmRepo {
  async add(data: AddUserConfirmRepo.Data): Promise<void> {
    await typeormDataSource
      .createQueryBuilder()
      .insert()
      .into(UserConfirmEntity)
      .values(data)
      .execute();
  }
}