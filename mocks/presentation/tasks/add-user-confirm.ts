import { AddUserConfirmTask } from '$/presentation/tasks/add-user-confirm';
import { mockUserConfirm } from 'mocks/domain/entities/user-confirm';

export class AddUserConfirmTaskMock implements AddUserConfirmTask {
  constructor (
    public $add: AddUserConfirmTask.Result = { ...mockUserConfirm },
  ) {}

  async add(_data: AddUserConfirmTask.Data): Promise<AddUserConfirmTask.Result> {
    return this.$add;
  }
}