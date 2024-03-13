require('dotenv').config()

const UserService = require('../../services/user-service');

describe('Create User', () => {
    it('should create a user', async () => {
        const { id } = await UserService.createUser({
            name: 'Allexandre',
            email: 'allexandre@allexandre',
            password: '123456'
        })

        expect(id).toBeTruthy()
    });

})