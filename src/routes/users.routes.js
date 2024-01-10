const express = require('express');
const { ProtectedRouteMiddleware } = require('../middlewares/protected-route.middleware');
const { CreateUserController } = require('../controllers/users/create-user.controller');

const users_routes = express.Router();
const authenticated_users_routes = express.Router();

authenticated_users_routes.use(ProtectedRouteMiddleware.handler);

users_routes.post('/users', CreateUserController.handler);

users_routes.use(authenticated_users_routes);

module.exports = { users_routes };
