import { typeormDataSource } from '$/infra/typeorm/data-source';
import { typeormHelper } from '$/infra/typeorm/helper';
import app from '$/main/app';
import { faker } from '@faker-js/faker';
import supertest from 'supertest';
import { mockInsertQueryBuilder } from 'tests/helpers';

describe('routes/api/index', () => {
  describe('POST /register', () => {
    const url = '/api/register';
    const validBody = {
      email: faker.internet.email(),
    };

    it.each([
      ['"body.email" is required', {}],
      ['"body.email" is empty', { email: '' }],
      ['"body.email" is invalid email', { email: 'invalid_email' }],
    ])('Should return 400 uf %s', async (_, body) => {
      const result = await supertest(app).post(url).send(body);
      expect(result.status).toBe(400);
    });

    it('Should return 401 if email in use', async () => {
      jest.spyOn(typeormHelper, 'searchQuery2Builder')
        .mockReturnValueOnce({ getOne: jest.fn().mockResolvedValue({}) } as any);
      const result = await supertest(app).post(url).send(validBody);
      expect(result.status).toBe(409);
    });

    it('Should return 201 if user are registred', async () => {
      jest.spyOn(typeormHelper, 'searchQuery2Builder')
        // check if "email" in use
        .mockReturnValueOnce({ getOne: jest.fn().mockResolvedValue(undefined) } as any);
      jest.spyOn(typeormDataSource, 'createQueryBuilder')
        // add new user
        .mockReturnValueOnce(mockInsertQueryBuilder())
        // add user profile
        .mockReturnValueOnce(mockInsertQueryBuilder());
      const result = await supertest(app).post(url).send(validBody);
      expect(result.status).toBe(201);
    });
  });
});