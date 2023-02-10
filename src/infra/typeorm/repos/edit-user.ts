import { EditUserRepo } from '$/data/repos/edit-user';
import { typeormDataSource } from '../data-source';
import { UserEntity } from '../entities/user';

export class EditUserRepoImpl implements EditUserRepo {
  async edit(data: EditUserRepo.Data): Promise<void> {
    await typeormDataSource
      .createQueryBuilder()
      .update(UserEntity)
      .set(data.changes)
      .where('id = :id', { id: data.id })
      .execute();
  }
}