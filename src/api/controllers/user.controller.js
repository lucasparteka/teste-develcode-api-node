const db = require("../../config/database");

const GENERIC_MESSAGE = "Ocorreu um erro ao realizar a operação solicitada. Tente novamente mais tarde"

exports.listAllUsers = async (req, res) => {
    try {
        const response = await db.query(
            'SELECT * FROM en_user ORDER BY code desc;',
        );
        res.status(200).send(response.rows);
    } catch (error) {
        res.status(400).send(GENERIC_MESSAGE);
    }
}

exports.getById = async (req, res) => {
    try {
        const code = parseInt(req.params.code);
        const response = await db.query(
            'SELECT * FROM en_user WHERE code = $1', [code],
        );

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
            'INSERT INTO en_user (name, birth, avatar) VALUES ($1, $2, $3) RETURNING code', [user.name, user.birth, user.avatar],
        );
        
        res.status(201).send({ ...user, code: response.rows[0].code });
    } catch (error) {
        res.status(400).send(GENERIC_MESSAGE);
    }
}

exports.updateUser = async (req, res) => {
    try {
        const user = req.body;
        const code = parseInt(user.code);
        let errors = validateUser(user);

        if (errors.length)
            return res.status(400).send(errors);

        const response = await db.query(
            'UPDATE en_user SET name = $1, birth = $2, avatar = $3 WHERE code = $4',
            [user.name, user.birth, user.avatar, code],
        );
        if (response.rowCount === 0) {
            return res.status(400).send("Não foi possível atualizar as informações do usuário");
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

    if (!user.birth)
        errors.push("É necessário informar a data de nascimento do usuário");

    return errors;
}