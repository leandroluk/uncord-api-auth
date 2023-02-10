import { RegisterUserUseCase } from '$/domain/usecases/register-user';
import Joi from 'joi';
import { joiHelpers } from '../helpers';

export const registerUserValidator = joiHelpers.makeValidator(
  Joi.object<RegisterUserUseCase.Data>({
    body: Joi.object<RegisterUserUseCase.Data['body']>({
      email: Joi.string().required().email(),
    }),
  }),
);