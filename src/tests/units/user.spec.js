const User = require('../../schemas/User');
const UserService = require('../../services/user-service');

jest.mock('../../schemas/User', () => ({
    create: jest.fn(),
    findOne: jest.fn()
}));

describe('[UNIT] User', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('[CREATE] Deve criar um usuário', async () => {
        User.create.mockResolvedValue({
            id: 'mocked_id'
        })

        const result = await UserService.createUser({
            name: 'Teste',
            email: 'teste@example.com.br',
            password: 'password'
        })

        expect(User.create).toHaveBeenCalledWith({
            name: 'Teste',
            email: 'teste@example.com.br',
            password: 'password'
        });
        expect(result).toEqual({ id: 'mocked_id' });
    });

    it('[READ] Deve verificar se o usuário existe', async () => {
        User.findOne.mockResolvedValueOnce(null);

        const exist = await UserService.userExistsAndCheckPassword({
            email: 'teste@gmail.com.br',
            password: '123456'
        });

        expect(User.findOne).toHaveBeenCalledWith({ email: 'teste@gmail.com.br' });
        expect(exist).toBeFalsy();
    })

    it('[READ] Deve verificar se o usuário não existe', async () => {
        User.findOne.mockResolvedValueOnce({ email: 'allexandre@gmail.com.br', password: '123456' });

        const exist = await UserService.userExistsAndCheckPassword({
            email: 'allexandre@gmail.com.br',
            password: '123456'
        });

        expect(User.findOne).toHaveBeenCalledWith({ email: 'allexandre@gmail.com.br' });
        expect(exist).toBeTruthy();
    })

    it('[READ] Deve verificar se as senhas estão corretas', async () => {
        User.findOne.mockResolvedValueOnce({ email: 'teste@example.com.br', password: 'password' });

        const result = await UserService.userExistsAndCheckPassword({
            email: 'teste@example.com.br',
            password: 'password'
        });

        expect(User.findOne).toHaveBeenCalledWith({ email: 'teste@example.com.br' });
        expect(result).toBe(true);
    })

    it('[ERROR] Deve lancar um erro ao criar um usuário', async () => {
        User.create.mockRejectedValueOnce(new Error('Database error'));

        await expect(UserService.createUser({
            name: 'Teste',
            email: 'teste@example.com',
            password: 'password'
        })).rejects.toThrow('Database error');
    });

    it('[ERROR] Deve lancar um erro ao verificar se o usuário existe', async () => {
        User.findOne.mockRejectedValueOnce(new Error('Database error'));

        await expect(UserService.userExistsAndCheckPassword({
            email: 'teste@example.com',
            password: 'password'
        })).rejects.toThrow('Database error');
    });
})