import { GetUserRepo } from '$/data/repos/get-user-repo';
import { mockUser } from 'mocks/domain/entities/user';

export class GetUserRepoMock implements GetUserRepo {
  constructor (
    public $get: GetUserRepo.Result = { ...mockUser },
  ) {}

  async get(_where: GetUserRepo.Where): Promise<GetUserRepo.Result> {
    return this.$get;
  }
}