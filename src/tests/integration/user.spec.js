const request = require('supertest');
const app = require('../../app');
const mongooseConnect = require('../../../mongoconnect');
const auth = require('../../middlewares/auth');
const jwt = require('jsonwebtoken');
const UserService = require('../../services/user-service');

jest.mock('../../middlewares/auth');

describe('[INTEGRATION] User', () => {

  beforeAll(async () => {
    mongooseConnect();
  });

  it('[CREATE] Deve criar um usuário', async () => {
    const response = await request(app)
      .post('/user')
      .send({
        name: 'Teste',
        email: 'teste5@example.com.br',
        password: 'password'
      });

    expect(response.status).toBe(200);
    expect(response.body.id).toBeDefined();
  });

  it('[CREATE] Deve retornar senha inválido ao criar um usuário', async () => {
    const response = await request(app)
      .post('/user')
      .send({
        name: 'Teste',
        email: 'teste@example.com.br',
      });

    expect(response.status).toBe(400);
    expect(response.text).toBe('\"Senha inválida\"');
  });

  it('[CREATE] Deve retornar email inválido ao criar um usuário', async () => {
    const response = await request(app)
      .post('/user')
      .send({
        name: 'Teste',
        email: 'teste',
        password: 'password'
      });

    expect(response.status).toBe(400);
    expect(response.text).toBe('\"Email inválido\"');
  });

  //Teste: [UPDATE] Deve atualizar a senha do usuário
  it('[UPDATE] Deve alterar a senha do usuário', async () => {
    auth.mockImplementation((req, res, next) => {
      req.userEmail = 'teste@example.com.br';
      next();
    })

    jest.spyOn(jwt, 'verify').mockReturnValue({ email: 'teste@example.com.br' });

    const response = await request(app)
      .post('/change-password')
      .send({
        email: 'teste@example.com.br',
      });

    expect(response.status).toBe(200);
    // expect(response.text).toBe('\"ok\"');
  })
})