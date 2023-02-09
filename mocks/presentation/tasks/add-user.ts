import { AddUserTask } from '$/presentation/tasks/add-user';
import { mockUser } from 'mocks/domain/entities/user';

export class AddUserTaskMock implements AddUserTask {
  constructor (
    public $add: AddUserTask.Result = { ...mockUser },
  ) {}

  async add(_data: AddUserTask.Data): Promise<AddUserTask.Result> {
    return this.$add;
  }
}