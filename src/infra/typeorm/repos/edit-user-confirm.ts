import { EditUserConfirmRepo } from '$/data/repos/edit-user-confirm';
import { typeormDataSource } from '../data-source';
import { UserConfirmEntity } from '../entities/user-confirm';

export class EditUserConfirmRepoImpl implements EditUserConfirmRepo {
  async edit(data: EditUserConfirmRepo.Data): Promise<void> {
    await typeormDataSource
      .createQueryBuilder()
      .update(UserConfirmEntity)
      .set(data.changes)
      .where('id = :id', { id: data.id })
      .execute();
  }
}