const express = require('express');
const { users_routes } = require('./users.routes');
const { sessions_routes } = require('./sessions.routes');

const routes = express.Router();

routes.use(sessions_routes);
routes.use(users_routes);

module.exports = { routes };
