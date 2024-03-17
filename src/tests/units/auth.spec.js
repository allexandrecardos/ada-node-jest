const auth = require('../../middlewares/auth');
const jwt = require('jsonwebtoken');

jest.mock('jsonwebtoken');

describe('[UNIT] Auth', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    req = {
      headers: {
        authorization: 'token'
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  it('[MIDDLEWARE] Deve setar {req.userEmail} se token for válido', async () => {
    const userEmail = 'teste@example.com.br';
    const decodedToken = { email: userEmail };
    jwt.verify.mockResolvedValue(decodedToken);

    await auth(req, res, next);

    expect(req.userEmail).toBe(userEmail);
    expect(next).toHaveBeenCalled();
  });

  it('[MIDDLEWARE] Deve retornar 401 se o token não for fornecido', async () => {
    delete req.headers.authorization;

    await auth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Token is not provided' });
    expect(next).not.toHaveBeenCalled();
  })

  it('[MIDDLEWARE] Deve retornar 401 se o token for inválido', async () => {
    jwt.verify.mockRejectedValue(new Error('Invalid token'));

    await auth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid token' });
    expect(next).not.toHaveBeenCalled();
  });
})