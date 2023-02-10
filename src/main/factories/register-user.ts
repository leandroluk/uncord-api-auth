import { AddUserConfirmTaskImpl } from '$/data/tasks/add-user-confirm';
import { AddUserWithProfileTaskImpl } from '$/data/tasks/add-user-with-profile';
import { CheckEmailInUseTaskImpl } from '$/data/tasks/check-email-in-use';
import { SendConfirmEmailTaskImpl } from '$/data/tasks/send-confirm-email';
import { RegisterUserUseCase } from '$/domain/usecases/register-user';
import { CreateRandomStringContractImpl } from '$/infra/adapters/create-random-string';
import { CreateUuidContractImpl } from '$/infra/adapters/create-uuid';
import { ConfirmEmailTemplateContractImpl } from '$/infra/mustache/confirm-email-template';
import { SendEmailContractImpl } from '$/infra/nodemailer/send-email';
import { AddUserRepoImpl } from '$/infra/typeorm/repos/add-user';
import { AddUserConfirmRepoImpl } from '$/infra/typeorm/repos/add-user-confirm';
import { GetUserRepoImpl } from '$/infra/typeorm/repos/get-user-repo';
import { RegisterUserUseCaseImpl } from '$/presentation/usecases/register-user';
import vars from '$/vars';
import path from 'path';

let instance: RegisterUserUseCase;

export const registerUserFactory = (): RegisterUserUseCase => {
  if (!instance) {
    const getUserRepo = new GetUserRepoImpl();
    const checkEmailInUseTask = new CheckEmailInUseTaskImpl(
      getUserRepo,
    );
    const createUuidContract = new CreateUuidContractImpl();
    const createRandomStringContract = new CreateRandomStringContractImpl();
    const addUserRepo = new AddUserRepoImpl();
    const addUserWithProfileTask = new AddUserWithProfileTaskImpl(
      createUuidContract,
      createRandomStringContract,
      addUserRepo,
      vars.default.randomPasswordLength,
    );
    const addUserConfirmRepo = new AddUserConfirmRepoImpl();
    const addUserConfirmTask = new AddUserConfirmTaskImpl(
      createUuidContract,
      addUserConfirmRepo,
      vars.default.codeExpiresAt,
    );
    const confirmEmailTemplateContract = new ConfirmEmailTemplateContractImpl(
      path.resolve(vars.path, 'src', 'main', 'templates', 'confirm.html'),
      path.resolve(vars.path, 'src', 'main', 'templates', 'confirm.txt'),
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
    instance = new RegisterUserUseCaseImpl(
      checkEmailInUseTask,
      addUserWithProfileTask,
      addUserConfirmTask,
      sendConfirmEmailTask,
    );
  }
  return instance;
};