const express = require('express');
const LogController = require('./app/controllers/index');

const routes = express.Router();

routes.get('/', (req, res) => {
    return res.send('API de logs beta')
});

routes.post('/create', LogController.createLog);

module.exports = routes;