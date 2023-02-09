import { ConflitError } from '$/domain/errors/conflit';
import { ForbiddenError } from '$/domain/errors/forbidden';
import { NotFoundError } from '$/domain/errors/not-found';
import { UnauthorizedError } from '$/domain/errors/unauthorized';
import logger from '$/logger';
import { errorHandlerMiddleware } from '$/main/middlewares/error-handler';
import express from 'express';
import 'express-async-errors';
import supertest from 'supertest';

describe('errorHandlerMiddleware', () => {
  const url = '/errorHandlerMiddleware';
  const app = express()
    .use(url, async (req, _res) => {
      const err = new Error();
      err.name = req.query.name as string;
      throw err;
    })
    .use(errorHandlerMiddleware);

  it.each([
    [400, 'ValidationError'],
    [401, UnauthorizedError.name],
    [403, ForbiddenError.name],
    [404, NotFoundError.name],
    [409, ConflitError.name],
  ])('Should return %d when throw async %s', async (code, errorName) => {
    const query = { name: errorName };
    const result = await supertest(app).post(url).query(query);
    expect(result.status).toBe(code);
  });

  it('Should return 500 and log error when any unknown async error throw', async () => {
    const errorSpy = jest.spyOn(logger, 'error').mockImplementationOnce(jest.fn());
    const query = { name: 'UnknownError' };
    const result = await supertest(app).post(url).query(query);
    expect(result.status).toBe(500);
    expect(errorSpy).toBeCalled();
  });
});