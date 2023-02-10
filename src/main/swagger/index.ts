import { ConflitError } from '$/domain/errors/conflit';
import { ForbiddenError } from '$/domain/errors/forbidden';
import { NotFoundError } from '$/domain/errors/not-found';
import { UnauthorizedError } from '$/domain/errors/unauthorized';
import { RegisterUserUseCase } from '$/domain/usecases/register-user';
import { SendConfirmEmailUseCase } from '$/domain/usecases/send-confirm-email';
import vars from '$/vars';
import { OpenAPIV3 } from 'openapi-types';
import { ObjectSchema } from './types/object-schema';
import { SimpleError } from './types/simple-error';

const enum TagType {
  Auth = 'auth',
}

const enum ContentType {
  Json = 'application/json',
}

const commonResponses: OpenAPIV3.ResponsesObject = {
  400: {
    description: 'Bad Request',
    content: {
      [ContentType.Json]: {
        schema: {
          type: 'object',
          required: ['message', 'name'],
          properties: {
            name: { type: 'string' },
            message: { type: 'string' },
          },
        } satisfies ObjectSchema<SimpleError>,
        example: {
          name: 'ValidationSimpleError',
          message: 'body.{{field}} is required',
        } satisfies SimpleError,
      },
    },
  },
  401: {
    description: 'Unauthorized',
    content: {
      [ContentType.Json]: {
        schema: {
          type: 'object',
          required: ['message', 'name'],
          properties: {
            name: { type: 'string' },
            message: { type: 'string' },
          },
        } satisfies ObjectSchema<SimpleError>,
        example: {
          name: UnauthorizedError.name,
          message: 'Unauthorized',
        } satisfies SimpleError,
      },
    },
  },
  403: {
    description: 'Forbidden',
    content: {
      [ContentType.Json]: {
        schema: {
          type: 'object',
          required: ['message', 'name'],
          properties: {
            name: { type: 'string' },
            message: { type: 'string' },
          },
        } satisfies ObjectSchema<SimpleError>,
        example: {
          name: ForbiddenError.name,
          message: 'Forbidden',
        } satisfies SimpleError,
      },
    },
  },
  404: {
    description: 'Not Found',
    content: {
      [ContentType.Json]: {
        schema: {
          type: 'object',
          required: ['message', 'name'],
          properties: {
            name: { type: 'string' },
            message: { type: 'string' },
          },
        } satisfies ObjectSchema<SimpleError>,
        example: {
          name: NotFoundError.name,
          message: 'Not found',
        } satisfies SimpleError,
      },
    },
  },
  409: {
    description: 'Conflit',
    content: {
      [ContentType.Json]: {
        schema: {
          type: 'object',
          required: ['message', 'name'],
          properties: {
            name: { type: 'string' },
            message: { type: 'string' },
          },
        } satisfies ObjectSchema<SimpleError>,
        example: {
          name: ConflitError.name,
          message: 'Conflit',
        } satisfies SimpleError,
      },
    },
  },
} as const;

const docs: OpenAPIV3.Document = {
  openapi: '3.0.3',
  info: {
    title: vars.app.name,
    version: vars.app.version,
  },
  tags: [{ name: TagType.Auth }],
  paths: {
    // api
    '/api/register': {
      post: {
        operationId: 'CSU001',
        summary: 'Register *User*',
        externalDocs: { url: 'https://github.com/leandroluk/undef-api-auth/wiki/%5BCSU001%5D-Register-*User*' },
        tags: [TagType.Auth],
        requestBody: {
          content: {
            [ContentType.Json]: {
              schema: {
                type: 'object',
                required: ['email'],
                properties: {
                  email: { type: 'string' },
                },
              } satisfies ObjectSchema<RegisterUserUseCase.Data['body']>,
              example: {
                email: 'user@email.com',
              } satisfies RegisterUserUseCase.Data['body'],
            },
          },
        },
        responses: {
          201: { description: 'Created' },
          400: commonResponses[400],
          409: commonResponses[409],
        },
      },
    },
    '/api/confirm': {
      patch: {
        operationId: 'CSU002',
        summary: 'Send confirm email',
        externalDocs: { url: 'https://github.com/leandroluk/undef-api-auth/wiki/%5BCSU002%5D-Send-confirm-email' },
        tags: [TagType.Auth],
        requestBody: {
          content: {
            [ContentType.Json]: {
              schema: {
                type: 'object',
                required: ['email'],
                properties: {
                  email: { type: 'string' },
                },
              } satisfies ObjectSchema<SendConfirmEmailUseCase.Data['body']>,
              example: {
                email: 'user@email.com',
              } satisfies SendConfirmEmailUseCase.Data['body'],
            },
          },
        },
        responses: {
          200: { description: 'Ok' },
          400: commonResponses[400],
          404: commonResponses[404],
        },
      },
    },
    // default
    '/health': {
      get: {
        summary: 'Health check',
        responses: {
          200: {
            description: 'Application is healthy',
            content: {
              [ContentType.Json]: {
                schema: {
                  type: 'object',
                  required: ['name', 'version', 'env', 'uptime'],
                  properties: {
                    name: { type: 'string' },
                    version: { type: 'string' },
                    env: { type: 'string' },
                    uptime: { type: 'string' },
                  },
                },
                example: {
                  name: vars.app.name,
                  version: vars.app.version,
                  env: vars.app.env,
                  uptime: '1m',
                },
              },
            },
          },
          500: {
            description: 'Application is unhealthy',
          },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};

export default docs;