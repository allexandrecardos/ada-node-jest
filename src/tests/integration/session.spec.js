const request = require('supertest');
const app = require('../../app');
const mongooseConnect = require('../../../mongoconnect');
const UserService = require('../../services/user-service');
const SessionService = require('../../services/session-service');

UserService
SessionService

describe('[INTEGRATION] Session', () => {

  beforeAll(async () => {
    mongooseConnect();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('[CREATE] Deve retornar email inválido ao criar uma sessão', async () => {
    const response = await request(app)
      .post('/session')
      .send({
        name: 'Teste',
        email: 'semEmail',
        password: 'password'
      });

    expect(response.status).toBe(400);
    expect(response.text).toBe('\"Email inválido\"');
  })

  it('[CREATE] Deve retornar senha inválido ao criar uma sessão', async () => {
    const response = await request(app)
      .post('/session')
      .send({
        ame: 'Teste',
        email: 'teste@gmail.com',
      });

    expect(response.status).toBe(400);
    expect(response.text).toBe('\"Senha inválida\"');
  })

  it('[CREATE] Deve retornar usuário não encontrado ao criar uma sessão', async () => {
    const response = await request(app)
      .post('/session')
      .send({
        email: 'naoexiste@gmail.com',
        password: 'nopassword'
      });

    expect(response.status).toBe(404);
    expect(response.text).toBe('\"Usuário não encontrado\"');
  })

  it('[CREATE] Deve retornar a sessão', async () => {
    jest.spyOn(UserService, 'userExistsAndCheckPassword').mockResolvedValue(true);
    jest.spyOn(SessionService, 'generateToken').mockResolvedValue('token');

    const response = await request(app)
      .post('/session')
      .send({
        email: 'naoexiste@gmail.com',
        password: 'nopassword'
      });

    expect(response.status).toBe(200);
    expect(response.body.token).toBe('token');
  });

  it('[CREATE] Deve lancar erro ao criar a sessão', async () => {
    jest.spyOn(UserService, 'userExistsAndCheckPassword').mockRejectedValue('Server Error');

    const response = await request(app)
      .post('/session')
      .send({
        email: 'naoexiste@gmail.com',
        password: 'nopassword'
      });

    expect(response.status).toBe(500);
    expect(response.text).toBe('\"Server Error\"');
  });
})