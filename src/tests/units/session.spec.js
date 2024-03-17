const SessionService = require('../../services/session-service');

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockImplementation((payload, secret, options) => {
    return 'mocked_token';
  })
}));

describe('[UNIT] Session', () => {

  it('[CREATE] Deve gerar um token', async () => {
    const token = await SessionService.generateToken('test@example.com');
    expect(token).toBe('mocked_token');
  });

})