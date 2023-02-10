import { SendConfirmEmailUseCase } from '$/domain/usecases/send-confirm-email';
import Joi from 'joi';
import { joiHelpers } from '../helpers';

export const sendConfirmEmailValidator = joiHelpers.makeValidator(
  Joi.object<SendConfirmEmailUseCase.Data>({
    body: Joi.object<SendConfirmEmailUseCase.Data['body']>({
      email: Joi.string().required().email(),
    }),
  }),
);