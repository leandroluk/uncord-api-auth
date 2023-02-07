import { RegisterUser } from '$/domain/usecases/register-user';
import Joi from 'joi';
import { joiHelpers } from '../helpers';

export const registerUserValidator = joiHelpers.makeValidator(
  Joi.object<RegisterUser.Data>({
    body: Joi.object<RegisterUser.Data['body']>({
      email: Joi.string().required().email(),
    }),
  }),
);