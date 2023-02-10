export class NotFoundError extends Error {
  constructor (message?: string) {
    super(message);
    this.name = 'NotFoundError';
  }

  static is(error: Error): error is NotFoundError {
    return error instanceof NotFoundError;
  }
}