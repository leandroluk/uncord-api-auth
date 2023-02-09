import { AddUserConfirmRepo } from '$/data/repos/add-user-confirm';

export class AddUserConfirmRepoMock implements AddUserConfirmRepo {
  async add(_data: AddUserConfirmRepo.Data): Promise<void> {
    //
  }
}