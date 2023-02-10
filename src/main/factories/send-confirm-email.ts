import { AddUserConfirmTaskImpl } from '$/data/tasks/add-user-confirm';
import { GetUserTaskImpl } from '$/data/tasks/get-user';
import { GetUserConfirmTaskImpl } from '$/data/tasks/get-user-confirm';
import { ResetUserTaskImpl } from '$/data/tasks/reset-user';
import { ResetUserConfirmTaskImpl } from '$/data/tasks/reset-user-confirm';
import { SendConfirmEmailTaskImpl } from '$/data/tasks/send-confirm-email';
import { SendConfirmEmailUseCase } from '$/domain/usecases/send-confirm-email';
import { CreateRandomStringContractImpl } from '$/infra/adapters/create-random-string';
import { CreateUuidContractImpl } from '$/infra/adapters/create-uuid';
import { ConfirmEmailTemplateContractImpl } from '$/infra/mustache/confirm-email-template';
import { SendEmailContractImpl } from '$/infra/nodemailer/send-email';
import { AddUserConfirmRepoImpl } from '$/infra/typeorm/repos/add-user-confirm';
import { EditUserRepoImpl } from '$/infra/typeorm/repos/edit-user';
import { EditUserConfirmRepoImpl } from '$/infra/typeorm/repos/edit-user-confirm';
import { GetUserConfirmRepoImpl } from '$/infra/typeorm/repos/get-user-confirm-repo';
import { GetUserRepoImpl } from '$/infra/typeorm/repos/get-user-repo';
import { SendConfirmEmailUseCaseImpl } from '$/presentation/usecases/send-confirm-email';
import vars from '$/vars';
import fs from 'fs';
import path from 'path';

let instance: SendConfirmEmailUseCase;

export const sendConfirmEmailFactory = (): SendConfirmEmailUseCase => {
  if (!instance) {
    const getUserRepo = new GetUserRepoImpl();
    const getUserTask = new GetUserTaskImpl(
      getUserRepo,
    );
    const getUserConfirmRepo = new GetUserConfirmRepoImpl();
    const getUserConfirmTask = new GetUserConfirmTaskImpl(
      getUserConfirmRepo,
    );
    const createUuidContract = new CreateUuidContractImpl();
    const editUserConfirmRepo = new EditUserConfirmRepoImpl();
    const createRandomStringContract = new CreateRandomStringContractImpl();
    const resetUserConfirmTask = new ResetUserConfirmTaskImpl(
      getUserConfirmRepo,
      createUuidContract,
      editUserConfirmRepo,
      vars.default.codeExpiresAt,
    );
    const editUserRepo = new EditUserRepoImpl();
    const resetUserTask = new ResetUserTaskImpl(
      getUserRepo,
      createRandomStringContract,
      editUserRepo,
      vars.default.randomPasswordLength,
    );
    const addUserConfirmRepo = new AddUserConfirmRepoImpl();
    const addUserConfirmTask = new AddUserConfirmTaskImpl(
      createUuidContract,
      addUserConfirmRepo,
      vars.default.codeExpiresAt,
    );
    const confirmPath = path.resolve(vars.path, 'src', 'main', 'templates', 'confirm');
    const confirmEmailTemplateContract = new ConfirmEmailTemplateContractImpl(
      fs.readFileSync(path.resolve(confirmPath, 'html'), 'utf8'),
      fs.readFileSync(path.resolve(confirmPath, 'txt'), 'utf8'),
    );
    const sendEmailContract = new SendEmailContractImpl(
      vars.mail.smtp,
      vars.mail.port,
      vars.mail.secure,
      vars.mail.username,
      vars.mail.password,
    );
    const sendConfirmEmailTask = new SendConfirmEmailTaskImpl(
      confirmEmailTemplateContract,
      sendEmailContract,
      vars.mail.confirmURL,
      vars.mail.from,
      vars.mail.confirmSubject,
    );
    instance = new SendConfirmEmailUseCaseImpl(
      getUserTask,
      getUserConfirmTask,
      resetUserConfirmTask,
      resetUserTask,
      addUserConfirmTask,
      sendConfirmEmailTask,
    );
  }
  return instance;
};