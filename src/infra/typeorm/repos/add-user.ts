import { AddUserRepo } from '$/data/repos/add-user';
import { typeormDataSource } from '../data-source';
import { UserEntity } from '../entities/user';

export class AddUserRepoImpl implements AddUserRepo {
  async add(data: AddUserRepo.Data): Promise<void> {
    await typeormDataSource
      .createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values(data)
      .execute();
  }
}