const express = require('express');

const { CreateSessionController } = require('../controllers/sessions/create-session.controller');

const sessions_routes = express.Router();

sessions_routes.post('/sessions', CreateSessionController.handler);

module.exports = { sessions_routes };
