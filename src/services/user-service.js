const User = require('../schemas/User');

class UserService {
    static async createUser({ name, email, password }) {
        console.log("Antes de criar o usuário");
        try {
            const { id } = await User.create({
                name,
                email,
                password
            });
            console.log("Usuário criado com sucesso");
            return { id };
        } catch (error) {
            console.error("Erro ao criar o usuário:", error);
            throw error;
        }
    }

    static async userExistsAndCheckPassword({ email, password }) {
        console.log("Verificando se o usuário existe e checando a senha");
        try {
            const user = await User.findOne({ email });

            if (!user) {
                return false;
            }

            if (password !== user.password) {
                throw { status: 400, message: 'As senhas não batem' };
            }

            console.log("Usuário existe e a senha coincide");
            return true;
        } catch (error) {
            console.error("Erro ao verificar o usuário e senha:", error);
            throw error;
        }
    }
}

module.exports = UserService;
