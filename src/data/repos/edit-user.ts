import { User } from '$/domain/entities/user';
import { Indexable } from '$/domain/generics/indexable';

export type EditUserRepo = {
  edit(data: EditUserRepo.Data): Promise<void>;
};
export namespace EditUserRepo {
  export type Data = {
    id: User['id'];
    changes: Partial<Omit<User, keyof Indexable>>;
  };
}