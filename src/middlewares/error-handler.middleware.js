const { ZodError } = require('zod');

function parse_zod_error(error) {
  const issue = error.issues.at(0);

  if (!issue) {
    return 'something different';
  }

  return `${issue.path.join('.')}: ${issue.code}`;
}

class ErrorHandlerMiddleware {
  static async handler(error, _request, response, _next) {
    if (error instanceof ZodError) {
      return response.status(400).json({ error: parse_zod_error(error) });
    }

    if (process.env.NODE_ENV !== 'production') {
      console.error(error);
    }

    return response.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  ErrorHandlerMiddleware,
};
