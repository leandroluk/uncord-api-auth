import { AddUserWithProfileTask } from '$/presentation/tasks/add-user-with-profile';
import { mockUser } from 'mocks/domain/entities/user';

export class AddUserWithProfileTaskMock implements AddUserWithProfileTask {
  constructor (
    public $add: AddUserWithProfileTask.Result = { ...mockUser },
  ) {}

  async add(_data: AddUserWithProfileTask.Data): Promise<AddUserWithProfileTask.Result> {
    return this.$add;
  }
}