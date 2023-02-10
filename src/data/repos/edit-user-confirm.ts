import { UserConfirm } from '$/domain/entities/user-confirm';
import { Indexable } from '$/domain/generics/indexable';

export type EditUserConfirmRepo = {
  edit(data: EditUserConfirmRepo.Data): Promise<void>;
};
export namespace EditUserConfirmRepo {
  export type Data = {
    id: UserConfirm['id'];
    changes: Partial<Omit<UserConfirm, keyof Indexable>>;
  };
}