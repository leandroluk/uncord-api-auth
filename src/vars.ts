import packageJson from 'package.json';
const { env, cwd } = process;

const mailPort = Number(env.MAIL_PORT ?? 587);
const defaultPostgres = 'postgresql://postgres:postgres@localhost:5432/undef-api-auth';

const vars = {
  port: Number(env.PORT ?? 3000),
  path: cwd(),
  app: {
    name: packageJson.name,
    version: packageJson.version,
    env: env.NODE_ENV /* default 'development' */,
  },
  default: {
    codeLength: Number(env.DEFAULT_CODE_LENGTH ?? 50),
    codeExpiresAt: Number(env.DEFAULT_CODE_EXPIRES_AT ?? 1000 * 60 * 60 * 24),
  },
  mail: {
    smtp: env.MAIL_SMTP ?? 'smtp.ethereal.email',
    from: env.MAIL_FROM ?? 'undef-api-auth@email.com',
    port: mailPort,
    secure: mailPort === 465,
    username: env.MAIL_USERNAME ?? 'yrntovgc2joj5y7d@ethereal.email',
    password: env.MAIL_PASSWORD ?? 'RXDQ2jaQmaHtGjtytD',
    expiresAt: Number(env.MAIL_EXPIRES_AT ?? 1000 * 60 * 60 * 12 /* default 12h */),
    codeLength: Number(env.MAIL_CODE_LENGTH ?? 50),
    confirmSubject: env.MAIL_CONFIRM_SUBJECT ?? 'Confirm email',
    confirmURL: new URL(env.MAIL_CONFIRM_URL ?? 'http://localhost:3000/api/confirm').origin,
    resetSubject: env.MAIL_RESET_SUBJECT ?? 'Reset subject',
  },
  jwt: {
    privateKey: env.JWT_PRIVATE_KEY ?? 'secret',
    publicKey: env.JWT_PUBLIC_KEY ?? 'secret',
    algorithm: env.JWT_AUGORITHM ?? 'HS256',
    audience: env.JWT_AUDIENCE ?? 'http://localhost:3000',
    issuer: env.JWT_ISSUER ?? 'issuer',
    accessTTL: Number(env.JWT_ACCESS_TTL ?? 1000 * 60 * 10), // default 10 minutes
    refreshTTL: Number(env.JWT_REFRESH_TTL ?? 1000 * 60 * 60 * 24 * 14), // default 14 days
  },
  db: {
    postgresWriter: env.DB_POSTGRES_WRITER ?? defaultPostgres,
    postgresReader: env.DB_POSTGRES_READER ?? defaultPostgres,
  },
};

export default vars;