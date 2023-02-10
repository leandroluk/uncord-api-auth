import { registerUserFactory } from '$/main/factories/register-user';
import { sendConfirmEmailFactory } from '$/main/factories/send-confirm-email';
import { registerUserValidator } from '$/main/validation/validators/register-user';
import { sendConfirmEmailValidator } from '$/main/validation/validators/send-confirm-email';
import { Router } from 'express';

const apiRoutes = Router();

apiRoutes.post('/register', async (req, res) => {
  const data = await registerUserValidator(req);
  await registerUserFactory().register(data);
  res.sendStatus(201);
});

apiRoutes.patch('/confirm', async (req, res) => {
  const data = await sendConfirmEmailValidator(req);
  await sendConfirmEmailFactory().send(data);
  res.sendStatus(200);
});

export default apiRoutes;