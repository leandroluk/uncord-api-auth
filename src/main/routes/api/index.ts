import { registerUserFactory } from '$/main/factories/register-user';
import { loggerMiddleware } from '$/main/middlewares/logger';
import { registerUserValidator } from '$/main/validation/validators/register-user';
import { Router } from 'express';

const apiRoutes = Router();

apiRoutes.use(loggerMiddleware);

apiRoutes.post('/register', async (req, res) => {
  const data = await registerUserValidator(req);
  await registerUserFactory().register(data);
  res.sendStatus(201);
});

export default apiRoutes;