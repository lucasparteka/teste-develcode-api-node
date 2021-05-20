const db = require("../../config/database");

const GENERIC_MESSAGE = "Ocorreu um erro ao realizar a operação solicitada. Tente novamente mais tarde"

exports.listAllUsers = async (req, res) => {
    try {
        const response = await db.query(
            'SELECT * FROM en_user;',
        );
        res.status(200).send(response.rows);
    } catch (error) {
        res.status(400).send(GENERIC_MESSAGE);
    }
}

exports.getById = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const response = await db.query(
            'SELECT * FROM en_user WHERE codigo = $1', [userId],
        );
        if (response.rowCount === 0) {
            return res.status(404).send("Usuário não encontrado");
        }

        res.status(200).send(response.rows[0]);
    } catch (error) {
        res.status(400).send(GENERIC_MESSAGE);
    }
}

exports.insertUser = async (req, res) => {
    try {
        const user = req.body;
        let errors = validateUser(user);

        if (errors.length)
            return res.status(400).send(errors);

        const response = await db.query(
            'INSERT INTO en_user (nome, data_nascimento, foto) VALUES ($1, $2, $3) RETURNING codigo', [user.name, user.birthDate, user.photo],
        );
        if (response.rowCount === 0) {
            return res.status(404).send("Usuário não encontrado");
        }
        res.status(201).send({ ...user, codigo: response.rows[0].codigo });
    } catch (error) {
        res.status(400).send(GENERIC_MESSAGE);
    }
}

exports.updateUser = async (req, res) => {
    try {
        const user = req.body;
        const userId = parseInt(user.userId);
        let errors = validateUser(user);

        if (errors.length)
            return res.status(400).send(errors);

        const response = await db.query(
            'UPDATE en_user SET nome = $1, data_nascimento = $2, foto = $3 WHERE codigo = $4',
            [user.name, user.birthDate, user.photo, userId],
        );
        if (response.rowCount === 0) {
            return res.status(404).send("Não foi possível atualizar as informações do usuário");
        }
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(GENERIC_MESSAGE);
    }
}

const validateUser = (user) => {
    let errors = [];

    if (!user) {
        errors.push("Nenhum usuário informado");
        return errors;
    }

    if (!user.name)
        errors.push("É necessário informar o nome do usuário");

    if (!user.birthDate)
        errors.push("É necessário informar a data de nascimento do usuário");

    return errors;
}