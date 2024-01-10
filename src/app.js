require('express-async-errors');
const cors = require('cors');
const cookie_parser = require('cookie-parser');
const express = require('express');
const morgan = require('morgan');

const { routes } = require('./routes');
const { NotFoundMiddleware } = require('./middlewares/not-found.middleware');
const { ErrorHandlerMiddleware } = require('./middlewares/error-handler.middleware');

const MORGAN_FORMAT = '[:date[clf]] :method :status :url';

function app_factory() {
  const app = express();

  app.use(cors({ credentials: true, origin: process.env.ORIGIN }));
  app.use(cookie_parser());
  app.use(express.json());
  app.use(morgan(MORGAN_FORMAT));
  app.use('/api', routes);
  app.use(ErrorHandlerMiddleware.handler);
  app.use(NotFoundMiddleware.handler);

  return app;
}

module.exports = {
  app_factory,
};
