const User = require('../schemas/User');

class UserService {
    static async createUser({ name, email, password }) {
        try {
            const { id } = await User.create({
                name,
                email,
                password
            });
            return { id };
        } catch (error) {
            // console.error("Erro ao criar o usuário:", error);
            throw error;
        }
    }

    static async userExistsAndCheckPassword({ email, password }) {
        try {
            const user = await User.findOne({ email });

            if (!user) {
                return false;
            }

            if (password !== user.password) {
                throw { status: 400, message: 'As senhas não batem' };
            }

            return true;
        } catch (error) {
            // console.error("Erro ao verificar o usuário e senha:", error);
            throw error;
        }
    }
}

module.exports = UserService;
