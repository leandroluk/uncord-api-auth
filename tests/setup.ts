global.console = {
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
} as unknown as Console;

jest.mock('nodemailer', () => {
  const sendMail = jest.fn();
  return {
    sendMail,
    createTransport: () => ({
      sendMail,
    }),
  };
});