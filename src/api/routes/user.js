const express = require("express");
const userController = require("../controllers/user.controller");
const route = express.Router();

module.exports = (app) => {
    app.use('/users', route);

    route.get('/', userController.listAllUsers);

    route.get('/:code', userController.getById);

    route.post('/', userController.insertUser);

    route.put('/', userController.updateUser)
}