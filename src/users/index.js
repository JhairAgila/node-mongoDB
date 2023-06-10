const express = require('express');
const {UsersController} = require('./controller')
const router = express.Router();

module.exports.UserApi = (app) => {
    router
        .get('/', UsersController.getUsers) // We have to pass it like a callback (without executate)
        .get('/:id', UsersController.gerUser)
        .post('/', UsersController.createUser)
        .patch('/:id', UsersController.updateUser)
        .delete('/:id', UsersController.deleteUser)
        
    app.use('/api/users', router);

};