import { ConflitError } from '$/domain/errors/conflit';
import { ForbiddenError } from '$/domain/errors/forbidden';
import { NotFoundError } from '$/domain/errors/not-found';
import { UnauthorizedError } from '$/domain/errors/unauthorized';
import vars from '$/vars';
import { OpenAPIV3 } from 'openapi-types';
import { ObjectSchema } from './types/object-schema';
import { SimpleError } from './types/simple-error';

const enum ContentType {
  Json = 'application/json',
}

/* eslint-disable @typescript-eslint/no-unused-vars */
const commonResponses: OpenAPIV3.ResponsesObject = {
  400: {
    description: 'bad request',
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
    description: 'unauthorized',
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
    description: 'forbidden',
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
    description: 'not found',
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
    description: 'conflit',
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
  tags: [],
  paths: {
    // default
    '/health': {
      get: {
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