const express = require('express');
const UserController = require('./app/controllers/userController');
const LogController = require('./app/controllers/logController');

const routes = express.Router();

routes.get('/', (req, res) => {
    return res.send('API mock')
});

routes.post('/user/create', UserController.register);
routes.post('/user/login', UserController.login);

routes.post('/log/create', LogController.createLog);

module.exports = routes;