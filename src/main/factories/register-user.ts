import { AddUserTaskImpl } from '$/data/tasks/add-user';
import { AddUserConfirmTaskImpl } from '$/data/tasks/add-user-confirm';
import { CheckEmailInUseTaskImpl } from '$/data/tasks/check-email-in-use';
import { SendConfirmEmailTaskImpl } from '$/data/tasks/send-confirm-email';
import { RegisterUser } from '$/domain/usecases/register-user';
import { CreateRandomStringContractImpl } from '$/infra/adapters/create-random-string';
import { CreateUuidContractImpl } from '$/infra/adapters/create-uuid';
import { ConfirmEmailTemplateContractImpl } from '$/infra/mustache/confirm-email-template';
import { SendEmailContractImpl } from '$/infra/nodemailer/send-email';
import { AddUserRepoImpl } from '$/infra/typeorm/repos/add-user';
import { AddUserConfirmRepoImpl } from '$/infra/typeorm/repos/add-user-confirm';
import { GetUserRepoImpl } from '$/infra/typeorm/repos/get-user-repo';
import { RegisterUserImpl } from '$/presentation/usecases/register-user';
import vars from '$/vars';
import path from 'path';

let instance: RegisterUser;

export const registerUserFactory = (): RegisterUser => {
  if (!instance) {
    const getUserRepo = new GetUserRepoImpl();
    const checkEmailInUseTask = new CheckEmailInUseTaskImpl(
      getUserRepo,
    );
    const createUuidContract = new CreateUuidContractImpl();
    const createRandomStringContract = new CreateRandomStringContractImpl();
    const addUserRepo = new AddUserRepoImpl();
    const addUserTask = new AddUserTaskImpl(
      createUuidContract,
      createRandomStringContract,
      addUserRepo,
      50,
    );
    const createRandomString = new CreateRandomStringContractImpl();
    const addUserConfirmRepo = new AddUserConfirmRepoImpl();
    const addUserConfirmTask = new AddUserConfirmTaskImpl(
      createUuidContract,
      createRandomString,
      addUserConfirmRepo,
      vars.default.codeLength,
      vars.default.codeExpiresAt,
    );
    const confirmEmailTemplateContract = new ConfirmEmailTemplateContractImpl(
      path.resolve(vars.path, 'main', 'templates', 'confirm.html'),
      path.resolve(vars.path, 'main', 'templates', 'confirm.txt'),
    );
    const sendEmailContract = new SendEmailContractImpl(
      vars.mail.smtp,
      vars.mail.port,
      vars.mail.secure,
      vars.mail.username,
      vars.mail.password,
    );
    const sendConfirmEmailTask = new SendConfirmEmailTaskImpl(
      vars.mail.confirmURL,
      confirmEmailTemplateContract,
      vars.mail.from,
      vars.mail.confirmSubject,
      sendEmailContract,
    );
    instance = new RegisterUserImpl(
      checkEmailInUseTask,
      addUserTask,
      addUserConfirmTask,
      sendConfirmEmailTask,
    );
  }
  return instance;
};