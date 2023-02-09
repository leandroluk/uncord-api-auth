import { AddUserRepo } from '$/data/repos/add-user';

export class AddUserRepoMock implements AddUserRepo {
  async add(_data: AddUserRepo.Data): Promise<void> {
    //
  }
}